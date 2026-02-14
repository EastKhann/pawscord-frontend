export const getStyles = (isMobile, isSaving) => ({
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 10000, padding: isMobile ? '0' : '20px',
  },
  modal: {
    background: 'linear-gradient(135deg, rgba(30,31,34,0.98), rgba(35,36,40,0.98))',
    borderRadius: isMobile ? '0' : '16px', width: '100%',
    maxWidth: isMobile ? '100%' : '900px', height: isMobile ? '100%' : 'auto',
    maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
    boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(88,101,242,0.3)',
    border: isMobile ? 'none' : '1px solid rgba(88,101,242,0.4)',
  },
  header: {
    padding: isMobile ? '16px' : '20px 24px',
    background: 'linear-gradient(135deg, rgba(88,101,242,0.15), rgba(114,137,218,0.15))',
    borderBottom: '1px solid rgba(88,101,242,0.3)',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  title: {
    fontSize: isMobile ? '20px' : '24px', fontWeight: '700',
    color: 'rgba(255,255,255,0.95)', margin: 0,
    display: 'flex', alignItems: 'center', gap: '10px',
  },
  content: { flex: 1, overflowY: 'auto', padding: isMobile ? '16px' : '24px' },
  section: { marginBottom: '24px' },
  sectionTitle: {
    fontSize: '18px', fontWeight: '600', color: 'rgba(255,255,255,0.9)',
    marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px',
  },
  inputGroup: { marginBottom: '16px' },
  label: {
    display: 'block', fontSize: '14px', fontWeight: '500',
    color: 'rgba(255,255,255,0.8)', marginBottom: '8px',
  },
  input: {
    width: '100%', padding: '12px 14px', background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(88,101,242,0.3)', borderRadius: '8px',
    color: 'rgba(255,255,255,0.95)', fontSize: '15px', outline: 'none',
    boxSizing: 'border-box', transition: 'all 0.2s ease',
  },
  textarea: {
    width: '100%', minHeight: '80px', padding: '12px 14px',
    background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(88,101,242,0.3)',
    borderRadius: '8px', color: 'rgba(255,255,255,0.95)', fontSize: '14px',
    outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box',
  },
  commandCard: {
    background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(88,101,242,0.3)',
    borderRadius: '12px', padding: isMobile ? '12px' : '16px', marginBottom: '12px',
  },
  commandHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px',
  },
  commandActions: { display: 'flex', gap: '8px' },
  iconBtn: {
    background: 'rgba(88,101,242,0.2)', border: '1px solid rgba(88,101,242,0.4)',
    borderRadius: '6px', width: '36px', height: '36px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: 'rgba(255,255,255,0.9)', transition: 'all 0.2s ease', fontSize: '14px',
  },
  deleteBtn: {
    background: 'rgba(218,55,60,0.2)', border: '1px solid rgba(218,55,60,0.4)', color: '#da373c',
  },
  addBtn: {
    width: '100%', padding: '12px', background: 'rgba(88,101,242,0.2)',
    border: '1px solid rgba(88,101,242,0.4)', borderRadius: '8px',
    color: 'rgba(255,255,255,0.9)', fontSize: '15px', fontWeight: '500',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '8px', transition: 'all 0.2s ease', minHeight: '44px',
  },
  toggle: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
  switch: (enabled) => ({
    width: '50px', height: '28px',
    background: enabled ? 'linear-gradient(135deg, #43b581, #4caf50)' : 'rgba(255,255,255,0.2)',
    borderRadius: '14px', position: 'relative', cursor: 'pointer',
    transition: 'all 0.3s ease', border: '2px solid rgba(88,101,242,0.3)',
  }),
  switchKnob: (enabled) => ({
    width: '22px', height: '22px', background: 'white', borderRadius: '50%',
    position: 'absolute', top: '1px', left: enabled ? '24px' : '1px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  }),
  footer: {
    padding: isMobile ? '16px' : '20px 24px', borderTop: '1px solid rgba(88,101,242,0.2)',
    display: 'flex', gap: '12px', background: 'rgba(0,0,0,0.2)',
  },
  cancelBtn: {
    flex: 1, padding: '14px', background: 'rgba(78,80,88,0.5)',
    border: '1px solid rgba(88,101,242,0.3)', borderRadius: '8px',
    color: 'rgba(255,255,255,0.9)', fontSize: '16px', fontWeight: '600',
    cursor: 'pointer', transition: 'all 0.2s ease', minHeight: '44px',
  },
  saveBtn: {
    flex: 1, padding: '14px', background: 'linear-gradient(135deg, #5865f2, #7289da)',
    border: 'none', borderRadius: '8px', color: 'white', fontSize: '16px',
    fontWeight: '600', cursor: isSaving ? 'not-allowed' : 'pointer',
    opacity: isSaving ? 0.6 : 1, transition: 'all 0.2s ease',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '44px',
  },
});

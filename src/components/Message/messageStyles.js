const styles = {
  chatMessage: { display: 'flex', padding: '4px 48px 4px 72px', marginBottom: '0', position: 'relative', transition: 'background-color 0.1s ease', width: '100%', boxSizing: 'border-box', borderRadius: '0', minHeight: '44px' },
  avatarContainer: { position: 'absolute', left: '16px', marginTop: '2px', flexShrink: 0 },
  userAvatar: { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer', transition: 'opacity 0.15s ease' },
  contentWrapper: { flex: 1, minWidth: 0, maxWidth: '100%' },
  replyContainer: { display: 'flex', alignItems: 'center', fontSize: '0.85em', color: '#b9bbbe', marginBottom: '4px', opacity: 0.8, cursor: 'pointer' },
  replyLine: { width: '30px', borderTop: '2px solid #4f545c', borderLeft: '2px solid #4f545c', height: '10px', marginRight: '8px', borderTopLeftRadius: '6px', marginTop: '6px' },
  chartBtn: { marginTop: '5px', backgroundColor: 'rgba(240, 178, 50, 0.1)', border: '1px solid #f0b232', color: '#f0b232', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85em', display: 'inline-flex', alignItems: 'center', gap: '6px' },
  footerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', minHeight: '20px' },
  readReceipt: { fontSize: '0.75em', color: '#b9bbbe', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' },
};

export default styles;

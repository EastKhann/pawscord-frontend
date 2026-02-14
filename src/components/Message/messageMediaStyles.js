const styles = {
  messageImage: { width: 'min(450px, 100%)', height: 'auto', display: 'block', objectFit: 'cover', borderRadius: '8px', marginTop: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' },
  messageVideo: { width: 'min(720px, 100%)', height: 'auto', borderRadius: '8px', marginTop: '8px', backgroundColor: 'black' },
  fileAttachment: { display: 'flex', alignItems: 'center', padding: '14px 16px', backgroundColor: '#2b2d31', borderRadius: '8px', marginTop: '8px', border: '1px solid #3a3d44', maxWidth: '450px', transition: 'all 0.2s ease', cursor: 'default' },
  fileIcon: { fontSize: '32px', marginRight: '12px', flexShrink: 0 },
  fileInfo: { flex: 1, minWidth: 0, marginRight: '12px' },
  fileName: { color: '#f2f3f5', fontSize: '14px', fontWeight: '500', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  fileDetails: { color: '#b9bbbe', fontSize: '12px' },
  downloadButton: { display: 'flex', alignItems: 'center', padding: '8px 14px', backgroundColor: '#5865f2', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s ease', border: 'none', cursor: 'pointer', flexShrink: 0 },
  loadingMedia: { padding: '12px', color: '#72767d', fontSize: '13px' },
  voiceTranscription: { display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '8px', padding: '10px 12px', backgroundColor: 'rgba(114, 137, 218, 0.1)', border: '1px solid rgba(114, 137, 218, 0.3)', borderRadius: '8px', maxWidth: '400px' },
  transcriptionIcon: { fontSize: '16px', flexShrink: 0, marginTop: '2px' },
  transcriptionText: { flex: 1, fontSize: '13px', lineHeight: '1.5', color: '#dcddde', fontStyle: 'italic' },
  transcribeButton: { marginTop: '8px', padding: '6px 12px', backgroundColor: 'rgba(88, 101, 242, 0.15)', border: '1px solid rgba(88, 101, 242, 0.4)', borderRadius: '6px', color: '#7289da', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '6px' },
  transcribingLoader: { marginTop: '8px', padding: '6px 12px', color: '#72767d', fontSize: '12px', fontStyle: 'italic' },
};

export default styles;

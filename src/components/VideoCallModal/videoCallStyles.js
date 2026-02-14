export const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)', zIndex: 10000,
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  container: {
    width: '100%', height: '100%', backgroundColor: '#1e1f22',
    display: 'flex', flexDirection: 'column', position: 'relative'
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 24px', backgroundColor: '#2f3136', borderBottom: '1px solid #1e1f22'
  },
  headerInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: {
    width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#5865f2',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '18px', fontWeight: 'bold', color: '#fff'
  },
  userInfo: { display: 'flex', flexDirection: 'column', gap: '4px' },
  username: { fontSize: '16px', fontWeight: 'bold', color: '#fff' },
  status: { fontSize: '13px', color: '#b9bbbe' },
  headerActions: { display: 'flex', gap: '8px' },
  headerButton: {
    backgroundColor: 'transparent', border: 'none', color: '#b9bbbe',
    fontSize: '18px', cursor: 'pointer', padding: '8px', borderRadius: '4px', transition: 'background-color 0.2s'
  },
  closeButton: {
    backgroundColor: '#f04747', border: 'none', color: '#fff',
    fontSize: '18px', cursor: 'pointer', padding: '8px 12px', borderRadius: '4px'
  },
  settingsPanel: {
    position: 'absolute', top: '70px', right: '24px', backgroundColor: '#2f3136',
    border: '1px solid #1e1f22', borderRadius: '8px', padding: '16px',
    width: '280px', zIndex: 100, boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
  },
  settingsTitle: { fontSize: '14px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' },
  settingGroup: { marginBottom: '12px' },
  settingLabel: { display: 'block', fontSize: '12px', color: '#b9bbbe', marginBottom: '6px' },
  settingSelect: {
    width: '100%', backgroundColor: '#40444b', border: '1px solid #1e1f22',
    borderRadius: '4px', padding: '8px', color: '#dcddde', fontSize: '13px'
  },
  videoGrid: { flex: 1, position: 'relative', backgroundColor: '#000' },
  remoteVideoContainer: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  remoteVideo: { width: '100%', height: '100%', objectFit: 'contain' },
  videoPlaceholder: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#b9bbbe' },
  placeholderAvatar: {
    width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#5865f2',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '48px', fontWeight: 'bold', color: '#fff'
  },
  localVideoContainer: {
    position: 'absolute', bottom: '100px', right: '24px', width: '240px', height: '180px',
    borderRadius: '8px', overflow: 'hidden', border: '2px solid #5865f2',
    backgroundColor: '#000', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
  },
  localVideo: { width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' },
  localVideoPlaceholder: {
    width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2f3136'
  },
  placeholderAvatarSmall: {
    width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#5865f2',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '24px', fontWeight: 'bold', color: '#fff'
  },
  controls: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px',
    padding: '24px', backgroundColor: '#2f3136'
  },
  controlButton: {
    width: '56px', height: '56px', borderRadius: '50%', border: 'none',
    backgroundColor: '#40444b', color: '#fff', fontSize: '20px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
  },
  controlButtonActive: { backgroundColor: '#f04747' },
  hangupButton: {
    width: '56px', height: '56px', borderRadius: '50%', border: 'none',
    backgroundColor: '#f04747', color: '#fff', fontSize: '20px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
  }
};

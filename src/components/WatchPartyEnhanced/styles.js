// WatchPartyEnhanced/styles.js
const styles = {
    container: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#1e1f22', zIndex: 9999,
        display: 'flex', flexDirection: 'column'
    },
    header: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px', backgroundColor: '#2b2d31',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    title: { fontSize: '18px', fontWeight: 'bold', color: '#ffffff' },
    participantCount: {
        fontSize: '13px', color: '#b9bbbe',
        backgroundColor: 'rgba(88, 101, 242, 0.15)', padding: '4px 8px', borderRadius: '12px'
    },
    closeButton: {
        background: 'none', border: 'none', color: '#b9bbbe',
        cursor: 'pointer', padding: '8px', borderRadius: '4px', transition: 'all 0.2s'
    },
    mainContent: { display: 'flex', flex: 1, overflow: 'hidden' },
    videoSection: {
        flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#000'
    },
    videoContainer: {
        position: 'relative', flex: 1, display: 'flex',
        alignItems: 'center', justifyContent: 'center'
    },
    video: { width: '100%', height: '100%', objectFit: 'contain' },
    reactionsOverlay: {
        position: 'absolute', top: '20px', right: '20px',
        display: 'flex', flexDirection: 'column', gap: '8px', pointerEvents: 'none'
    },
    reaction: {
        display: 'flex', alignItems: 'center', gap: '8px',
        backgroundColor: 'rgba(0,0,0,0.7)', padding: '8px 12px',
        borderRadius: '20px', animation: 'slideIn 0.3s ease-out'
    },
    reactionEmoji: { fontSize: '24px' },
    reactionUser: { color: '#fff', fontSize: '12px' },
    controlsOverlay: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
        padding: '20px', opacity: 1, transition: 'opacity 0.3s'
    },
    progressBarContainer: { marginBottom: '16px' },
    progressBar: {
        width: '100%', height: '4px', borderRadius: '2px',
        appearance: 'none', backgroundColor: 'rgba(255,255,255,0.2)',
        outline: 'none', cursor: 'pointer'
    },
    timeDisplay: {
        display: 'flex', justifyContent: 'space-between',
        marginTop: '8px', fontSize: '12px', color: '#fff'
    },
    controls: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    controlsLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    controlsRight: { display: 'flex', alignItems: 'center', gap: '12px' },
    controlButton: {
        background: 'none', border: 'none', color: '#fff',
        cursor: 'pointer', padding: '8px', borderRadius: '4px',
        transition: 'all 0.2s', display: 'flex',
        alignItems: 'center', justifyContent: 'center'
    },
    syncButton: {
        display: 'flex', alignItems: 'center', gap: '6px',
        background: 'rgba(88, 101, 242, 0.8)', border: 'none',
        color: '#fff', padding: '6px 12px', borderRadius: '4px',
        cursor: 'pointer', fontSize: '12px', fontWeight: '500'
    },
    volumeSlider: { width: '80px', height: '4px' },
    quickReactions: {
        display: 'flex', gap: '8px', padding: '12px 20px',
        backgroundColor: '#2b2d31', borderTop: '1px solid rgba(255,255,255,0.1)',
        justifyContent: 'center'
    },
    reactionButton: {
        background: 'rgba(255,255,255,0.05)', border: 'none',
        fontSize: '24px', padding: '8px 16px', borderRadius: '8px',
        cursor: 'pointer', transition: 'all 0.2s'
    },
    chatSection: {
        width: '350px', backgroundColor: '#2b2d31',
        borderLeft: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', flexDirection: 'column'
    },
    chatHeader: {
        padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)',
        fontWeight: 'bold', color: '#fff'
    },
    chatMessages: { flex: 1, overflowY: 'auto', padding: '12px' },
    ownMessage: {
        backgroundColor: 'rgba(88, 101, 242, 0.15)', padding: '8px 12px',
        borderRadius: '8px', marginBottom: '8px', wordWrap: 'break-word'
    },
    otherMessage: {
        backgroundColor: 'rgba(255,255,255,0.05)', padding: '8px 12px',
        borderRadius: '8px', marginBottom: '8px', wordWrap: 'break-word'
    },
    messageSender: { fontWeight: 'bold', color: '#5865f2', marginRight: '6px', fontSize: '13px' },
    messageText: { color: '#dcddde', fontSize: '13px' },
    chatInput: {
        display: 'flex', gap: '8px', padding: '12px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
    },
    chatInputField: {
        flex: 1, backgroundColor: '#383a40', border: 'none',
        borderRadius: '4px', padding: '10px 12px', color: '#fff',
        fontSize: '14px', outline: 'none'
    },
    sendButton: {
        backgroundColor: '#5865f2', border: 'none', color: '#fff',
        padding: '10px 20px', borderRadius: '4px', cursor: 'pointer',
        fontWeight: '500', fontSize: '14px'
    },
    settingsPanel: {
        position: 'absolute', bottom: '80px', right: '20px',
        backgroundColor: '#2b2d31', borderRadius: '8px',
        padding: '16px', minWidth: '200px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)'
    },
    settingsTitle: { color: '#fff', fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' },
    settingItem: { marginBottom: '12px' },
    select: {
        width: '100%', backgroundColor: '#383a40', border: 'none',
        color: '#fff', padding: '8px', borderRadius: '4px',
        fontSize: '13px', marginTop: '4px'
    }
};

export default styles;

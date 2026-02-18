import React, { useCallback } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import styles from '../styles';
import useModalA11y from '../../../hooks/useModalA11y';

const BroadcastModal = ({ announceText, handleBroadcast, setAnnounceText, setBroadcastModal }) => {
    const onClose = useCallback(() => setBroadcastModal(false), [setBroadcastModal]);
    const { modalRef, overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Broadcast Announcement' });
    return (
        <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 10
        }} {...overlayProps}>
            <div style={{
                backgroundColor: '#1a1a1e', borderRadius: '12px',
                padding: '24px', width: '500px', border: '1px solid #2a2a2e'
            }} {...dialogProps}>
                <h3 style={{ color: '#fff', marginTop: 0 }}>📢 Duyuru Gönder</h3>
                <textarea
                    value={announceText}
                    onChange={(e) => setAnnounceText(e.target.value)}
                    placeholder="Mesajınızı yazın..."
                    style={{
                        width: '100%', minHeight: '100px', padding: '12px',
                        backgroundColor: '#111113', border: '1px solid #2a2a2e',
                        borderRadius: '8px', color: '#fff', fontSize: '14px',
                        resize: 'vertical', outline: 'none', marginBottom: '12px'
                    }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={styles.actionBtn('#5865f2')} onClick={handleBroadcast}>
                        <FaPaperPlane /> Gönder
                    </button>
                    <button style={styles.actionBtn('#6b7280')} onClick={() => setBroadcastModal(false)}>
                        İptal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BroadcastModal;

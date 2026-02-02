// frontend/src/PinnedMessages.js

import React from 'react';
import Message from './Message'; // Message bileşenini yeniden kullanıyoruz

const PinnedMessages = ({ messages, onClose }) => {
    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.panel} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2>Sabitlenmiş Mesajlar</h2>
                    <button style={styles.closeButton} onClick={onClose}>×</button>
                </div>
                <div style={styles.list}>
                    {messages.length > 0 ? (
                        messages.map(msg => (
                            <div key={msg.id} style={styles.pinnedMessageItem}>
                                {/* Message bileşenini basit props'larla kullanıyoruz */}
                                <Message msg={msg} currentUser="" isAdmin={false} />
                            </div>
                        ))
                    ) : (
                        <p style={styles.noPinsText}>Bu kanalda sabitlenmiş mesaj yok.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    panel: { backgroundColor: '#36393f', color: 'white', width: '90%', maxWidth: '500px', height: '70%', display: 'flex', flexDirection: 'column', borderRadius: '8px', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #2f3136' },
    closeButton: { background: 'none', border: 'none', color: '#b9bbbe', fontSize: '1.8em', cursor: 'pointer' },
    list: { flexGrow: 1, overflowY: 'auto', padding: '10px 20px' },
    pinnedMessageItem: { marginBottom: '10px', border: '1px solid #40444b', borderRadius: '5px' },
    noPinsText: { textAlign: 'center', color: '#72767d', marginTop: '20px' },
};

export default React.memo(PinnedMessages);


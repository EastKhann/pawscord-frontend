import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaServer, FaUserFriends, FaTimes } from '../utils/iconOptimization';
import { styles } from '../SidebarStyles';

const AddServerModal = ({ isOpen, onClose, onCreateServer, onFriendsClick }) => {
    const [isCreatingServer, setIsCreatingServer] = useState(false);
    const [newServerName, setNewServerName] = useState('');
    const [isNewServerPublic, setIsNewServerPublic] = useState(false);

    const handleCreateServer = async (e) => {
        e?.preventDefault();
        if (!newServerName.trim()) return;
        await onCreateServer(newServerName, isNewServerPublic);
        setNewServerName('');
        setIsNewServerPublic(false);
        setIsCreatingServer(false);
    };

    if (!isOpen && !isCreatingServer) return null;

    // Sunucu oluşturma formu
    if (isCreatingServer) {
        return createPortal(
            <div style={styles.modalOverlay}>
                <form onSubmit={handleCreateServer} style={styles.addCategoryForm}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, color: 'white' }}>Sunucu Oluştur</h3>
                        <FaTimes style={{ cursor: 'pointer', color: '#b9bbbe' }} onClick={() => { setIsCreatingServer(false); onClose(); }} />
                    </div>
                    <p style={{ color: '#b9bbbe', fontSize: '0.9em' }}>Sunucuna bir isim ver.</p>
                    <input autoFocus placeholder="Sunucu Adı..." value={newServerName} onChange={e => setNewServerName(e.target.value)} style={styles.addRoomInput} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                        <input type="checkbox" id="publicCheck" checked={isNewServerPublic} onChange={(e) => setIsNewServerPublic(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#23a559' }} />
                        <label htmlFor="publicCheck" style={{ color: '#dbdee1', fontSize: '0.9em', cursor: 'pointer' }}>Herkese Açık (Keşfet'te Görünür)</label>
                    </div>
                    <button type="submit" style={styles.addRoomButton}>Oluştur</button>
                </form>
            </div>,
            document.body
        );
    }

    // Seçim menüsü
    return createPortal(
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.selectionModalContent} onClick={e => e.stopPropagation()}>
                <h3 style={{ color: 'white', margin: 0 }}>Ne Yapmak İstersin?</h3>
                <button style={{ ...styles.selectionButton, backgroundColor: '#5865f2' }} onClick={() => { setIsCreatingServer(true); }}><FaServer /> Sunucu Oluştur</button>
                <button style={{ ...styles.selectionButton, backgroundColor: '#23a559' }} onClick={() => { onClose(); if (onFriendsClick) onFriendsClick(); }}><FaUserFriends /> Arkadaş Ekle</button>
                <button style={{ marginTop: 10, background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer' }} onClick={onClose}>İptal</button>
            </div>
        </div>,
        document.body
    );
};

export default AddServerModal;

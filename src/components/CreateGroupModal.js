// frontend/src/components/CreateGroupModal.js

import React, { useState, useEffect } from 'react';
import { FaTimes, FaUserPlus, FaCheck } from 'react-icons/fa';
import toast from '../utils/toast';

const CreateGroupModal = ({ onClose, friendsList, fetchWithAuth, apiBaseUrl, onGroupCreated }) => {
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const toggleFriend = (username) => {
        if (selectedFriends.includes(username)) {
            setSelectedFriends(prev => prev.filter(u => u !== username));
        } else {
            setSelectedFriends(prev => [...prev, username]);
        }
    };

    const handleCreate = async () => {
        if (selectedFriends.length < 2) {
            toast.error('❌ En az 2 kişi seçmelisin');
            return;
        }

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/conversations/create_group/`, {
                method: 'POST',
                body: JSON.stringify({ usernames: selectedFriends })
            });

            if (res.ok) {
                const data = await res.json();
                toast.success('✅ Grup oluşturuldu!');
                onGroupCreated(data); // App.js'deki listeyi güncellemek için
                onClose();
            } else {
                toast.error('❌ Grup oluşturulamadı');
            }
        } catch (e) {
            console.error(e);
            toast.error('❌ Hata oluştu: ' + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3>Grup Oluştur</h3>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                <div style={styles.body}>
                    <p style={{ color: '#b9bbbe', marginBottom: 15 }}>
                        Gruba eklemek istediğin arkadaşlarını seç ({selectedFriends.length})
                    </p>

                    <div style={styles.friendList}>
                        {friendsList.map(friendName => (
                            <div
                                key={friendName}
                                onClick={() => toggleFriend(friendName)}
                                style={{
                                    ...styles.friendItem,
                                    backgroundColor: selectedFriends.includes(friendName) ? 'rgba(88, 101, 242, 0.3)' : '#2f3136',
                                    borderColor: selectedFriends.includes(friendName) ? '#5865f2' : 'transparent'
                                }}
                            >
                                <span style={{ color: 'white' }}>{friendName}</span>
                                {selectedFriends.includes(friendName) ? <FaCheck color="#5865f2" /> : <FaUserPlus color="#b9bbbe" />}
                            </div>
                        ))}
                        {friendsList.length === 0 && <p style={{ color: '#72767d' }}>Listenizde arkadaş yok.</p>}
                    </div>

                    <button
                        onClick={handleCreate}
                        style={styles.createBtn}
                        disabled={loading || selectedFriends.length < 2}
                    >
                        {loading ? 'Oluşturuluyor...' : 'Grup DM Oluştur'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center' },
    modal: { backgroundColor: '#313338', width: '400px', borderRadius: '8px', overflow: 'hidden' },
    header: { padding: '15px 20px', borderBottom: '1px solid #1e1f22', display: 'flex', justifyContent: 'space-between', color: 'white', alignItems: 'center' },
    closeBtn: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', fontSize: '1.2em' },
    body: { padding: '20px' },
    friendList: { maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' },
    friendItem: { padding: '10px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid transparent' },
    createBtn: { width: '100%', padding: '10px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', opacity: 0.9 },
};

export default CreateGroupModal;


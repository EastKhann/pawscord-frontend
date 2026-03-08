// frontend/src/components/ModeratorTools.js
import React, { useState } from 'react';
import toast from '../utils/toast';
import { FaTimes, FaBan, FaUserShield, FaTrashAlt } from 'react-icons/fa';

const ModeratorTools = ({ onClose, fetchWithAuth, apiBaseUrl, roomSlug, serverId }) => {
    const [selectedUser, setSelectedUser] = useState('');
    const [banReason, setBanReason] = useState('');
    const [banDuration, setBanDuration] = useState('permanent');
    const [moderatorNote, setModeratorNote] = useState('');
    const [loading, setLoading] = useState(false);

    const handleBanUser = async () => {
        if (!selectedUser) {
            toast.error('❌ Lütfen bir kullanıcı seçin');
            return;
        }

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/ban/`, {
                method: 'POST',
                body: JSON.stringify({
                    username: selectedUser,
                    reason: banReason,
                    duration: banDuration,
                    room_slug: roomSlug
                })
            });

            if (res.ok) {
                toast.success('✅ Kullanıcı yasaklandı');
                setSelectedUser('');
                setBanReason('');
            } else {
                toast.error('❌ Yasaklama başarısız');
            }
        } catch (error) {
            console.error('Ban error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNote = async () => {
        if (!selectedUser || !moderatorNote) {
            toast.error('❌ Kullanıcı ve not gerekli');
            return;
        }

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/notes/add/`, {
                method: 'POST',
                body: JSON.stringify({
                    username: selectedUser,
                    note: moderatorNote
                })
            });

            if (res.ok) {
                toast.success('✅ Not eklendi');
                setModeratorNote('');
            }
        } catch (error) {
            console.error('Add note error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>
                        <FaUserShield /> Moderatör Araçları
                    </h2>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>
                            <FaBan /> Kullanıcı Yasakla
                        </h3>
                        <input
                            type="text"
                            placeholder="Kullanıcı adı"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            style={styles.input}
                        />
                        <textarea
                            placeholder="Yasaklama sebebi"
                            value={banReason}
                            onChange={(e) => setBanReason(e.target.value)}
                            style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
                        />
                        <select
                            value={banDuration}
                            onChange={(e) => setBanDuration(e.target.value)}
                            style={styles.select}
                        >
                            <option value="1h">1 Saat</option>
                            <option value="1d">1 Gün</option>
                            <option value="7d">7 Gün</option>
                            <option value="30d">30 Gün</option>
                            <option value="permanent">Kalıcı</option>
                        </select>
                        <button
                            onClick={handleBanUser}
                            disabled={loading}
                            style={styles.banButton}
                        >
                            {loading ? 'Yasaklanıyor...' : '🔨 Yasakla'}
                        </button>
                    </div>

                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>
                            📝 Moderatör Notu Ekle
                        </h3>
                        <input
                            type="text"
                            placeholder="Kullanıcı adı"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            style={styles.input}
                        />
                        <textarea
                            placeholder="Moderatör notu"
                            value={moderatorNote}
                            onChange={(e) => setModeratorNote(e.target.value)}
                            style={{ ...styles.input, minHeight: '80px', resize: 'vertical' }}
                        />
                        <button
                            onClick={handleAddNote}
                            disabled={loading}
                            style={styles.noteButton}
                        >
                            {loading ? 'Ekleniyor...' : '✍️ Not Ekle'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
    },
    modal: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #182135'
    },
    title: {
        color: 'white',
        margin: 0,
        fontSize: '1.3em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '1.3em'
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1
    },
    section: {
        marginBottom: '25px',
        backgroundColor: '#1e2024',
        padding: '15px',
        borderRadius: '8px'
    },
    sectionTitle: {
        color: '#b5bac1',
        fontSize: '1em',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#111214',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        color: 'white'
    },
    select: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#111214',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        color: 'white'
    },
    banButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#f23f42',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    noteButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
    }
};

export default React.memo(ModeratorTools);



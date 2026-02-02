// frontend/src/components/ServerDiscoveryModal.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import toast from '../utils/toast';
import { FaTimes, FaGlobe, FaSignInAlt, FaSearch } from 'react-icons/fa';

const ServerDiscoveryModal = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const [servers, setServers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadPublicServers();
    }, []);

    const loadPublicServers = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/public/`);
            if (res.ok) {
                const data = await res.json();
                setServers(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleJoin = async (serverId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/join/`, {
                method: 'POST'
            });
            if (res.ok) {
                toast.success("✅ Sunucuya katıldın!");
                // Sayfayı yenilemeye gerek yok, RoomList socket ile güncellenir ama garanti olsun:
                window.location.reload();
            } else {
                const data = await res.json();
                toast.error(data.error || "❌ Katılamadın.");
            }
        } catch (e) {
            toast.error("❌ Hata oluştu.");
        }
    };

    const filteredServers = servers.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const modalContent = (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <FaGlobe color="#23a559" /> Sunucu Keşfet
                    </h2>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                <div style={styles.searchBar}>
                    <FaSearch color="#999" />
                    <input
                        style={styles.searchInput}
                        placeholder="Sunucu ara..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div style={styles.content}>
                    {loading ? <p style={{ color: '#ccc', textAlign: 'center' }}>Yükleniyor...</p> : (
                        <div style={styles.grid}>
                            {filteredServers.map(server => (
                                <div key={server.id} style={styles.card}>
                                    <div style={styles.cardHeader}>
                                        {server.icon ? (
                                            <img src={server.icon} style={styles.icon} alt={server.name} />
                                        ) : (
                                            <div style={styles.placeholderIcon}>{server.name.substring(0, 2).toUpperCase()}</div>
                                        )}
                                    </div>
                                    <div style={styles.cardBody}>
                                        <h4 style={styles.serverName}>{server.name}</h4>
                                        <p style={styles.memberCount}>{server.member_count} Üye</p>
                                        <button onClick={() => handleJoin(server.id)} style={styles.joinBtn}>
                                            <FaSignInAlt /> Katıl
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {filteredServers.length === 0 && <p style={{ color: '#999' }}>Sunucu bulunamadı.</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.85)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0
    },
    modal: {
        backgroundColor: '#313338',
        width: '700px',
        maxWidth: '90%',
        height: '600px',
        maxHeight: '80%',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        margin: 0
    },
    header: { padding: '20px', borderBottom: '1px solid #1e1f22', display: 'flex', justifyContent: 'space-between', color: 'white' },
    closeBtn: { background: 'none', border: 'none', color: 'white', fontSize: '1.5em', cursor: 'pointer', transition: 'color 0.2s' },
    searchBar: { margin: '20px', padding: '10px', backgroundColor: '#1e1f22', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' },
    searchInput: { background: 'transparent', border: 'none', color: 'white', flex: 1, outline: 'none', fontSize: '1em' },
    content: { flex: 1, overflowY: 'auto', padding: '0 20px 20px 20px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' },
    card: { backgroundColor: '#2b2d31', borderRadius: '8px', overflow: 'hidden', border: '1px solid #1e1f22', transition: 'transform 0.2s', cursor: 'pointer' },
    cardHeader: { height: '80px', backgroundColor: '#202225', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    icon: { width: '100%', height: '100%', objectFit: 'cover' },
    placeholderIcon: { color: '#dbdee1', fontSize: '1.5em', fontWeight: 'bold' },
    cardBody: { padding: '15px', textAlign: 'center' },
    serverName: { margin: '0 0 5px 0', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    memberCount: { fontSize: '0.8em', color: '#949ba4', marginBottom: '10px' },
    joinBtn: { width: '100%', padding: '8px', backgroundColor: '#23a559', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontWeight: 'bold', transition: 'background 0.2s' }
};

export default ServerDiscoveryModal;


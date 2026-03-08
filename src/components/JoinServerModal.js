// frontend/src/components/JoinServerModal.js
// Tamamen bağımsız - hiçbir dış prop'a ihtiyacı yok (sadece isOpen + onClose)
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { API_BASE_URL } from '../utils/apiEndpoints';
import toast from '../utils/toast';
import './JoinServerModal.css';

const JoinServerModal = ({ isOpen, onClose }) => {
    const [servers, setServers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [joiningId, setJoiningId] = useState(null);

    const getToken = () => localStorage.getItem('access_token');

    const apiFetch = useCallback(async (url, options = {}) => {
        const token = getToken();
        const res = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                ...options.headers,
            },
        });
        return res;
    }, []);

    // Sunucuları yükle
    const loadServers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await apiFetch(`${API_BASE_URL}/servers/public/`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setServers(Array.isArray(data) ? data : (data.results || []));
        } catch (e) {
            setError('Sunucular yüklenemedi. Lütfen tekrar dene.');
        } finally {
            setLoading(false);
        }
    }, [apiFetch]);

    useEffect(() => {
        if (isOpen) {
            loadServers();
            setSearchQuery('');
            setInviteCode('');
        }
    }, [isOpen, loadServers]);

    // ESC ile kapat
    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const handleJoinServer = async (serverId) => {
        setJoiningId(serverId);
        try {
            const res = await apiFetch(`${API_BASE_URL}/servers/${serverId}/join/`, { method: 'POST' });
            if (res.ok) {
                toast.success('Sunucuya başarıyla katıldın!');
                // Listeyi güncelle
                setServers(prev => prev.map(s => s.id === serverId ? { ...s, is_member: true } : s));
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'Sunucuya katılınamadı.');
            }
        } catch {
            toast.error('Bağlantı hatası. Lütfen tekrar dene.');
        } finally {
            setJoiningId(null);
        }
    };

    const handleJoinViaCode = async (e) => {
        e.preventDefault();
        const code = inviteCode.trim();
        if (!code) return;
        // Davet linkinden kodu çıkar
        const extracted = code.includes('/invite/') ? code.split('/invite/').pop().replace(/\/$/, '') : code;
        setJoiningId('invite');
        try {
            const res = await apiFetch(`${API_BASE_URL}/invites/join/`, {
                method: 'POST',
                body: JSON.stringify({ code: extracted }),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                toast.success(`"${data.server_name || 'Sunucu'}" sunucusuna katıldın!`);
                setInviteCode('');
                loadServers();
            } else {
                toast.error(data.error || 'Geçersiz davet kodu.');
            }
        } catch {
            toast.error('Bağlantı hatası.');
        } finally {
            setJoiningId(null);
        }
    };

    if (!isOpen) return null;

    const filtered = servers.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.owner && s.owner.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return createPortal(
        <div onClick={onClose} style={overlay}>
            <div onClick={e => e.stopPropagation()} style={modal} className="jsm-modal">
                {/* Header */}
                <div style={header}>
                    <h3 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>🌍 Sunucuya Katıl</h3>
                    <button onClick={onClose} style={closeBtn} aria-label="Kapat">✕</button>
                </div>

                {/* Davet kodu */}
                <div style={section}>
                    <p style={{ color: '#b5bac1', fontSize: '13px', margin: '0 0 8px' }}>
                        Davet kodu veya linki yapıştır:
                    </p>
                    <form onSubmit={handleJoinViaCode} style={{ display: 'flex', gap: '8px' }} className="jsm-invite-form">
                        <input
                            value={inviteCode}
                            onChange={e => setInviteCode(e.target.value)}
                            placeholder="https://pawscord.com/invite/abc123"
                            style={input}
                        />
                        <button
                            type="submit"
                            disabled={joiningId === 'invite' || !inviteCode.trim()}
                            style={{
                                ...joinBtn,
                                opacity: joiningId === 'invite' || !inviteCode.trim() ? 0.5 : 1,
                            }}
                        >
                            {joiningId === 'invite' ? '...' : 'Katıl'}
                        </button>
                    </form>
                </div>

                {/* Ayırıcı */}
                <div style={{ borderTop: '1px solid #2a2d31', margin: '0 0 12px' }} />

                {/* Arama */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="🔍 Sunucu ara..."
                    style={{ ...input, marginBottom: '12px' }}
                />

                {/* Sunucu listesi */}
                <div style={listContainer}>
                    {loading && <p style={infoText}>Yükleniyor...</p>}
                    {error && (
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            <p style={{ color: '#f23f42', marginBottom: '8px' }}>{error}</p>
                            <button onClick={loadServers} style={retryBtn}>Tekrar Dene</button>
                        </div>
                    )}
                    {!loading && !error && filtered.length === 0 && (
                        <p style={infoText}>
                            {servers.length === 0
                                ? 'Şu an halka açık sunucu yok.'
                                : 'Aramanızla eşleşen sunucu bulunamadı.'}
                        </p>
                    )}
                    {!loading && filtered.map(srv => (
                        <div key={srv.id} style={serverRow} className="jsm-server-row">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                                {srv.icon ? (
                                    <img src={srv.icon.startsWith('http') ? srv.icon : `https://api.pawscord.com${srv.icon}`} alt="" style={avatar} />
                                ) : (
                                    <div style={avatarFallback}>
                                        {srv.name.substring(0, 2).toUpperCase()}
                                    </div>
                                )}
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{srv.name}</div>
                                    <div style={{ color: '#b5bac1', fontSize: '12px' }}>{srv.member_count} Üye • {srv.owner}</div>
                                </div>
                            </div>
                            {srv.is_member ? (
                                <span style={{ color: '#23a559', fontSize: '13px', fontWeight: 600, flexShrink: 0 }}>✓ Üyesin</span>
                            ) : (
                                <button
                                    onClick={() => handleJoinServer(srv.id)}
                                    disabled={joiningId === srv.id}
                                    style={{
                                        ...joinBtn,
                                        opacity: joiningId === srv.id ? 0.5 : 1,
                                        flexShrink: 0,
                                    }}
                                >
                                    {joiningId === srv.id ? '...' : 'Katıl'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
};

// --- Styles ---
const overlay = {
    position: 'fixed', inset: 0, zIndex: 99999,
    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
};
const modal = {
    background: '#1e1f22', borderRadius: '12px', padding: '20px',
    width: '520px', maxWidth: '92vw', maxHeight: '80vh',
    display: 'flex', flexDirection: 'column',
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
};
const header = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '16px',
};
const closeBtn = {
    background: 'none', border: 'none', color: '#b5bac1',
    fontSize: '18px', cursor: 'pointer', padding: '4px 8px',
    borderRadius: '4px',
};
const section = {
    background: '#111214', borderRadius: '8px', padding: '12px', marginBottom: '12px',
};
const input = {
    flex: 1, padding: '10px 12px', borderRadius: '6px', border: '1px solid #2a2d31',
    background: '#111214', color: '#f2f3f5', fontSize: '14px', outline: 'none',
    boxSizing: 'border-box', width: '100%',
};
const joinBtn = {
    background: '#23a559', color: '#fff', border: 'none', borderRadius: '6px',
    padding: '8px 18px', fontWeight: 600, fontSize: '13px', cursor: 'pointer',
    whiteSpace: 'nowrap',
};
const retryBtn = {
    background: '#5865f2', color: '#fff', border: 'none', borderRadius: '6px',
    padding: '8px 16px', fontWeight: 600, cursor: 'pointer',
};
const listContainer = {
    flex: 1, overflowY: 'auto', minHeight: 0,
};
const serverRow = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: '#111214', padding: '10px 12px', borderRadius: '8px',
    marginBottom: '8px', border: '1px solid #2a2d31',
};
const avatar = {
    width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
};
const avatarFallback = {
    width: 38, height: 38, borderRadius: '50%', background: '#5865f2',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontWeight: 700, fontSize: '13px', flexShrink: 0,
};
const infoText = {
    color: '#b5bac1', textAlign: 'center', padding: '24px', fontStyle: 'italic',
};

export default JoinServerModal;

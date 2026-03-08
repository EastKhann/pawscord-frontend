import React, { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaTrash, FaSync, FaCrown, FaUser, FaSearch } from 'react-icons/fa';
import styles from '../styles';
import toast from '../../../utils/toast';

const WhitelistTab = ({ fetchWithAuth, apiBaseUrl }) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addMode, setAddMode] = useState('username'); // 'username' or 'friend_code'
    const [inputValue, setInputValue] = useState('');
    const [adding, setAdding] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');

    const fetchWhitelist = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/whitelist/`);
            if (res.ok) {
                const data = await res.json();
                setEntries(data.entries || []);
            } else {
                toast.error('Whitelist yüklenemedi');
            }
        } catch (err) {
            console.error('Whitelist fetch error:', err);
            toast.error('Whitelist yüklenemedi');
        }
        setLoading(false);
    }, [fetchWithAuth, apiBaseUrl]);

    useEffect(() => { fetchWhitelist(); }, [fetchWhitelist]);

    const handleAdd = async () => {
        const val = inputValue.trim();
        if (!val) return;

        setAdding(true);
        try {
            const body = addMode === 'username'
                ? { username: val }
                : { friend_code: val };

            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/whitelist/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                const data = await res.json();
                toast.success(`✅ ${data.friend_code} whitelist'e eklendi`);
                setInputValue('');
                fetchWhitelist();
            } else {
                const err = await res.json().catch(() => ({}));
                toast.error(err.error || 'Ekleme başarısız');
            }
        } catch (err) {
            console.error('Whitelist add error:', err);
            toast.error('Ekleme başarısız');
        }
        setAdding(false);
    };

    const handleRemove = async (friendCode) => {
        if (!window.confirm(`${friendCode} whitelist'ten çıkarılsın mı?`)) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/whitelist/${friendCode}/`, {
                method: 'DELETE',
            });

            if (res.ok) {
                toast.success(`🗑️ ${friendCode} whitelist'ten çıkarıldı`);
                fetchWhitelist();
            } else {
                const err = await res.json().catch(() => ({}));
                toast.error(err.error || 'Çıkarma başarısız');
            }
        } catch (err) {
            console.error('Whitelist remove error:', err);
            toast.error('Çıkarma başarısız');
        }
    };

    const filtered = entries.filter(e => {
        if (!searchFilter) return true;
        const q = searchFilter.toLowerCase();
        return (e.friend_code || '').toLowerCase().includes(q) ||
            (e.username || '').toLowerCase().includes(q);
    });

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#fff', fontSize: '18px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaCrown color="#ffd700" /> Premium Whitelist
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={styles.badge('#23a559')}>{entries.length} kullanıcı</span>
                    <button onClick={fetchWhitelist} style={styles.actionBtn('#5865f2')} title="Yenile">
                        <FaSync size={11} />
                    </button>
                </div>
            </div>

            {/* Add new entry */}
            <div style={{
                ...styles.statCard,
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #5865f210, #7c3aed10)',
            }}>
                <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px', marginBottom: '12px' }}>
                    ➕ Whitelist'e Ekle
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <button
                        onClick={() => setAddMode('username')}
                        style={{
                            ...styles.actionBtn(addMode === 'username' ? '#5865f2' : '#333'),
                            padding: '8px 14px',
                        }}
                    >
                        <FaUser size={10} /> Kullanıcı Adı
                    </button>
                    <button
                        onClick={() => setAddMode('friend_code')}
                        style={{
                            ...styles.actionBtn(addMode === 'friend_code' ? '#5865f2' : '#333'),
                            padding: '8px 14px',
                        }}
                    >
                        # Friend Code
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        placeholder={addMode === 'username' ? 'Kullanıcı adı girin...' : '7 haneli friend code girin...'}
                        style={{
                            ...styles.searchInput,
                            maxWidth: '320px',
                        }}
                    />
                    <button
                        onClick={handleAdd}
                        disabled={adding || !inputValue.trim()}
                        style={{
                            ...styles.actionBtn('#23a559'),
                            padding: '10px 18px',
                            opacity: adding || !inputValue.trim() ? 0.5 : 1,
                            cursor: adding || !inputValue.trim() ? 'not-allowed' : 'pointer',
                        }}
                    >
                        <FaPlus size={11} /> {adding ? 'Ekleniyor...' : 'Ekle'}
                    </button>
                </div>
            </div>

            {/* Search filter */}
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaSearch color="#6b7280" size={13} />
                <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Ara (kullanıcı adı veya friend code)..."
                    style={{ ...styles.searchInput, maxWidth: '300px' }}
                />
            </div>

            {/* Whitelist table */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                    <FaSync className="spin" size={20} /> Yükleniyor...
                </div>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>Friend Code</th>
                            <th style={styles.th}>Kullanıcı Adı</th>
                            <th style={styles.th}>Durum</th>
                            <th style={styles.th}>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ ...styles.td, textAlign: 'center', color: '#6b7280' }}>
                                    {searchFilter ? 'Sonuç bulunamadı' : 'Whitelist boş'}
                                </td>
                            </tr>
                        ) : filtered.map((entry, idx) => (
                            <tr key={entry.friend_code}>
                                <td style={styles.td}>{idx + 1}</td>
                                <td style={styles.td}>
                                    <span style={{
                                        fontFamily: 'monospace',
                                        backgroundColor: '#1a1a1e',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        color: '#ffd700',
                                        fontWeight: '600',
                                    }}>
                                        {entry.friend_code}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    {entry.username ? (
                                        <span style={{ color: '#fff', fontWeight: '500' }}>{entry.username}</span>
                                    ) : (
                                        <span style={{ color: '#6b7280', fontStyle: 'italic' }}>—</span>
                                    )}
                                </td>
                                <td style={styles.td}>
                                    <span style={styles.badge(entry.username ? '#23a559' : '#f0b132')}>
                                        {entry.username ? '✅ Aktif' : '⚠️ Bilinmeyen'}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <button
                                        onClick={() => handleRemove(entry.friend_code)}
                                        style={styles.actionBtn('#e74c3c')}
                                        title="Whitelist'ten çıkar"
                                    >
                                        <FaTrash size={10} /> Çıkar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default WhitelistTab;

// frontend/src/components/CryptoStoreModal.js (DİNAMİK VERSİYON)

import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaTimes, FaCoins, FaShoppingBag, FaTshirt, FaCheck, FaLock, FaBitcoin } from 'react-icons/fa';
import confirmDialog from '../utils/confirmDialog';

const CryptoStoreModal = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const [activeTab, setActiveTab] = useState('store'); // store, inventory, deposit
    const [balance, setBalance] = useState(0);
    const [storeItems, setStoreItems] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dailyInfo, setDailyInfo] = useState(null);
    const [txid, setTxid] = useState('');
    const [txidResult, setTxidResult] = useState(null);
    const packages = [
        { id: 'p1', coins: 1000, price: '15 USDT', note: 'Başlangıç paketi' },
        { id: 'p2', coins: 2500, price: '35 USDT', note: 'Popüler seçim' },
        { id: 'p3', coins: 6000, price: '75 USDT', note: 'En iyi değer' },
        { id: 'p4', coins: 15000, price: '180 USDT', note: 'Topluluk paketi' }
    ];
    const depositAddresses = [
        { label: 'USDT (TRC20)', value: 'TGAny6VmDAWdVmTXCPrpsbLKKQQdvyvnWC' },
        { label: 'USDT (ERC20)', value: '0xeaa14d4651a8ea7488289209b9294a1309dde37c' },
        { label: 'SOL (Solana)', value: 'Bk6ywhae86fp6BHmGtxabS6ncEGsFxhcnZEWJRZLVr9z' }
    ];
    const [selectedPack, setSelectedPack] = useState(packages[0]);

    const handleDailyClaim = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/daily-reward/`, { method: 'POST' });
            let data = null;
            try { data = await res.json(); } catch (_) { data = null; }
            // Log for debugging
            if (res.ok && data) {
                // Ensure expected keys exist to avoid undefined in UI
                const safe = {
                    claimed: !!data.claimed,
                    added_coins: typeof data.added_coins === 'number' ? data.added_coins : 0,
                    new_balance: typeof data.new_balance === 'number' ? data.new_balance : balance,
                    streak: typeof data.streak === 'number' ? data.streak : undefined,
                    reason: data.reason,
                    remaining_seconds: typeof data.remaining_seconds === 'number' ? data.remaining_seconds : undefined,
                    error: data.error,
                };
                setDailyInfo(safe);
                if (safe.claimed && typeof safe.new_balance === 'number') {
                    setBalance(safe.new_balance);
                }
                refreshData();
            } else {
                const msg = (data && (data.error || data.message || data.detail)) || 'İstek başarısız';
                setDailyInfo({ claimed: false, error: msg });
            }
        } catch (e) {
            console.error('[DailyReward] exception', e);
            setDailyInfo({ claimed: false, error: 'Beklenmeyen hata' });
        }
        setLoading(false);
    };
    // Bakiye ve Ürünleri Çek
    const refreshData = () => {
        fetchWithAuth(`${apiBaseUrl}/store/balance/`)
            .then(r => r.json())
            .then(d => setBalance(d.coins));

        fetchWithAuth(`${apiBaseUrl}/store/items/`)
            .then(r => r.json())
            .then(d => setStoreItems(d));

        fetchWithAuth(`${apiBaseUrl}/store/inventory/`)
            .then(r => r.json())
            .then(d => setInventory(d));
    };

    useEffect(() => {
        refreshData();
    }, [apiBaseUrl, fetchWithAuth]);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleBuy = async (itemId) => {
        if (!await confirmDialog("Bu ürünü satın almak istiyor musunuz?")) return;
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/buy/`, {
                method: 'POST',
                body: JSON.stringify({ item_id: itemId })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                refreshData(); // Listeleri yenile
            } else {
                toast.error(data.error);
            }
        } catch (e) { toast.error("❌ Hata oluştu."); }
        setLoading(false);
    };

    const handleEquip = async (inventoryId) => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/equip/${inventoryId}/`, { method: 'POST' });
            if (res.ok) {
                refreshData();
            }
        } catch (e) {
            console.error('Equip error:', e);
            toast.error('Item equip failed');
        }
        setLoading(false);
    };

    const handleVerifyTxid = async () => {
        const trimmed = txid.trim();
        if (!trimmed) {
            toast.error('❌ Lütfen işlem ID girin');
            return;
        }
        if (trimmed.length < 6) {
            setTxidResult({ success: false, message: 'İşlem ID çok kısa görünüyor' });
            return;
        }
        setLoading(true);
        setTxidResult(null);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/verify-txid/`, {
                method: 'POST',
                body: JSON.stringify({ txid: trimmed })
            });
            const data = await res.json();
            if (res.ok) {
                setTxidResult({ success: true, message: data.message || 'Ödeme doğrulandı!', added_coins: data.added_coins });
                refreshData();
                setTxid('');
            } else {
                setTxidResult({ success: false, message: data.error || data.detail || 'Doğrulama başarısız' });
            }
        } catch (e) {
            console.error('[VerifyTXID] exception', e);
            setTxidResult({ success: false, message: 'Beklenmeyen hata' });
        }
        setLoading(false);
    };

    const handleCopyAddress = async (value) => {
        try {
            await navigator.clipboard.writeText(value);
            toast.success('✅ Adres kopyalandı: ' + value);
        } catch (err) {
            toast.error('❌ Kopyalama başarısız oldu');
        }
    };

    const handlePasteTxid = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) setTxid(text.trim());
        } catch (e) {
            console.error('Clipboard read failed', e);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaCoins color="#f0b232" size={24} />
                        <h2 style={{ margin: 0, color: 'white' }}>Pawscord Mağaza</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                <div style={styles.balanceBar}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span>Mevcut Bakiye:</span>
                        <strong style={{ color: '#f0b232', fontSize: '1.2em' }}>{balance} Coin</strong>
                        <button onClick={handleDailyClaim} style={styles.dailyBtn} disabled={loading}>
                            🎁 +10
                        </button>
                    </div>
                </div>

                <div style={styles.tabs}>
                    <button style={activeTab === 'store' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('store')}><FaShoppingBag /> Mağaza</button>
                    <button style={activeTab === 'deposit' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('deposit')}><FaBitcoin /> PawsCoin Satın Al</button>
                    <button style={activeTab === 'inventory' ? styles.activeTab : styles.tab} onClick={() => setActiveTab('inventory')}><FaTshirt /> Envanterim</button>
                </div>

                <div style={styles.content}>
                    {/* --- MAĞAZA SEKMESİ --- */}
                    {activeTab === 'store' && (
                        <div style={styles.grid}>
                            {storeItems.map(item => (
                                <div key={item.id} style={styles.itemCard}>
                                    <div style={styles.iconPlace}>
                                        {/* Eğer resim varsa göster, yoksa ikon */}
                                        {item.preview_image ? (
                                            <img src={item.preview_image} alt={item.name} style={{ width: 50, height: 50 }} />
                                        ) : (
                                            <span style={{ fontSize: '2em' }}>🎁</span>
                                        )}
                                    </div>
                                    <h4>{item.name}</h4>
                                    <p style={{ fontSize: '0.8em', color: '#999' }}>{item.description}</p>
                                    {item.rarity && (
                                        <span style={{ fontSize: '0.75em', color: '#b9bbbe', marginBottom: 6 }}>Nadirlik: {item.rarity}</span>
                                    )}

                                    {item.is_owned ? (
                                        <button style={styles.ownedBtn} disabled>Sahipsin</button>
                                    ) : (
                                        <button
                                            onClick={() => handleBuy(item.id)}
                                            style={styles.buyBtn}
                                            disabled={loading || balance < item.price}
                                        >
                                            {balance < item.price ? <FaLock /> : null} {item.price} Coin
                                        </button>
                                    )}
                                </div>
                            ))}
                            {storeItems.length === 0 && <p style={{ color: '#ccc' }}>Mağazada ürün yok.</p>}
                        </div>
                    )}

                    {/* --- ENVANTER SEKMESİ --- */}
                    {activeTab === 'inventory' && (
                        <div style={styles.grid}>
                            {inventory.map(entry => (
                                <div key={entry.id} style={{ ...styles.itemCard, border: entry.is_equipped ? '1px solid #23a559' : '1px solid #1e1f22' }}>
                                    <div style={styles.iconPlace}>
                                        {entry.preview_image ? (
                                            <img src={entry.preview_image} alt={entry.name} style={{ width: 50, height: 50 }} />
                                        ) : (
                                            <span style={{ fontSize: '2em' }}>🎒</span>
                                        )}
                                    </div>
                                    <h4>{entry.name}</h4>
                                    <p style={{ fontSize: '0.8em', color: '#999' }}>{entry.item_type}</p>

                                    {entry.is_equipped ? (
                                        <button style={styles.equippedBtn} disabled><FaCheck /> Kuşanıldı</button>
                                    ) : (
                                        <button onClick={() => handleEquip(entry.id)} style={styles.useBtn} disabled={loading}>Kuşan</button>
                                    )}
                                </div>
                            ))}
                            {inventory.length === 0 && <p style={{ color: '#ccc' }}>Henüz bir şey satın almadın.</p>}
                        </div>
                    )}

                    {/* --- SATIN AL / DEPOSIT SEKMESİ --- */}
                    {activeTab === 'deposit' && (
                        <div style={{ padding: '10px', color: 'white' }}>
                            <h3 style={{ marginTop: 0, color: '#f0b232' }}>💰 PawsCoin Satın Al</h3>
                            <p style={{ color: '#b9bbbe', fontSize: '0.9em' }}>Kripto para ile PawsCoin satın alın. Ödemenizi yaptıktan sonra işlem ID'sini (TXID) aşağıya girin.</p>

                            {/* Paket seçenekleri */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, margin: '16px 0' }}>
                                {packages.map(pkg => {
                                    const selected = selectedPack?.id === pkg.id;
                                    return (
                                        <div
                                            key={pkg.id}
                                            onClick={() => setSelectedPack(pkg)}
                                            style={{
                                                backgroundColor: selected ? '#3b3f47' : '#202225',
                                                border: `1px solid ${selected ? '#5865f2' : '#1e1f22'}`,
                                                borderRadius: 10,
                                                padding: 12,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 6,
                                                transition: 'border-color 0.2s, background-color 0.2s'
                                            }}
                                        >
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: 700, color: 'white' }}>{pkg.coins.toLocaleString()} Coin</span>
                                                {selected && <FaCheck color="#23a559" />}
                                            </div>
                                            <div style={{ color: '#f0b232', fontWeight: 600 }}>{pkg.price}</div>
                                            <div style={{ color: '#b9bbbe', fontSize: '0.8em' }}>{pkg.note}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            {selectedPack && (
                                <div style={{
                                    marginBottom: 14,
                                    padding: 12,
                                    backgroundColor: '#202225',
                                    borderRadius: 8,
                                    border: '1px solid #1e1f22',
                                    color: '#b9bbbe',
                                    fontSize: '0.9em'
                                }}>
                                    Seçilen paket: <strong style={{ color: 'white' }}>{selectedPack.coins.toLocaleString()} Coin</strong> –
                                    <span style={{ color: '#f0b232', fontWeight: 600 }}> {selectedPack.price}</span>
                                </div>
                            )}

                            <div style={{ marginTop: 20, marginBottom: 20, padding: 15, backgroundColor: '#202225', borderRadius: 8, border: '1px solid #1e1f22' }}>
                                <h4 style={{ margin: '0 0 10px 0', color: '#5865f2' }}>📋 Ödeme Bilgileri</h4>
                                <div style={{ fontSize: '0.85em', color: '#b9bbbe', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {depositAddresses.map((addr) => (
                                        <div key={addr.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                                                <p style={{ margin: 0 }}><strong>{addr.label}:</strong></p>
                                                <button
                                                    onClick={() => handleCopyAddress(addr.value)}
                                                    style={{
                                                        backgroundColor: '#2f3136',
                                                        color: 'white',
                                                        border: '1px solid #1e1f22',
                                                        borderRadius: 6,
                                                        padding: '4px 10px',
                                                        cursor: 'pointer',
                                                        fontSize: '0.8em'
                                                    }}
                                                >
                                                    Kopyala
                                                </button>
                                            </div>
                                            <code style={{ display: 'block', padding: 8, backgroundColor: '#2b2d31', borderRadius: 4, wordBreak: 'break-all' }}>{addr.value}</code>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.75em', color: '#999', marginTop: 10 }}>
                                    Ödeme sonrası işlem ID'sini (TXID) aşağıya girin. Not: Şu an seçilen paket bilgisi bilgilendirme amaçlı, TXID doğrulaması işlem miktarını otomatik algılamaz.
                                </p>
                            </div>

                            <div style={{ marginBottom: 15 }}>
                                <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9em', color: '#b9bbbe' }}>İşlem ID (TXID):</label>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <input
                                        type="text"
                                        value={txid}
                                        onChange={(e) => setTxid(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleVerifyTxid(); } }}
                                        placeholder="İşlem ID'sini buraya yapıştırın"
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            backgroundColor: '#2b2d31',
                                            border: '1px solid #1e1f22',
                                            borderRadius: '4px',
                                            color: 'white',
                                            fontSize: '0.9em'
                                        }}
                                        disabled={loading}
                                    />
                                    <button
                                        onClick={handlePasteTxid}
                                        style={{
                                            padding: '0 12px',
                                            backgroundColor: '#5865f2',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            opacity: loading ? 0.6 : 1
                                        }}
                                        disabled={loading}
                                    >
                                        Yapıştır
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleVerifyTxid}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#5865f2',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontSize: '1em',
                                    fontWeight: '600',
                                    opacity: loading ? 0.6 : 1
                                }}
                                disabled={loading}
                            >
                                {loading ? 'Doğrulanıyor...' : 'Doğrula ve Coin Al'}
                            </button>

                            {txidResult && (
                                <div style={{
                                    marginTop: 15,
                                    padding: 12,
                                    backgroundColor: txidResult.success ? '#23a55933' : '#ff5d5d33',
                                    border: `1px solid ${txidResult.success ? '#23a559' : '#ff5d5d'}`,
                                    borderRadius: 6,
                                    color: txidResult.success ? '#23a559' : '#ff5d5d'
                                }}>
                                    {txidResult.success ? '✅' : '❌'} {txidResult.message}
                                    {txidResult.added_coins && <strong> (+{txidResult.added_coins} coin)</strong>}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {dailyInfo && (
                    <div style={{ padding: '10px 20px', borderTop: '1px solid #1e1f22', backgroundColor: '#202225' }}>
                        {dailyInfo.claimed ? (
                            <div style={{ color: '#23a559' }}>
                                🎁 {(dailyInfo.added_coins ?? 0)} coin aldın! Yeni bakiye: <strong>{dailyInfo.new_balance ?? balance}</strong>.
                                {typeof dailyInfo.streak !== 'undefined' && (
                                    <span style={{ marginLeft: 8, color: '#b9bbbe' }}>Streak: {dailyInfo.streak}</span>
                                )}
                            </div>
                        ) : dailyInfo.reason === 'cooldown' ? (
                            <div style={{ color: '#b9bbbe' }}>
                                ⏳ Günlük ödül için bekle: <strong>{Math.max(0, dailyInfo.remaining_seconds ?? 0)}</strong> sn
                            </div>
                        ) : (
                            <div style={{ color: '#ff5d5d' }}>⚠️ {(dailyInfo.error || 'Ödül alınamadı.')}</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', boxSizing: 'border-box' },
    modal: { backgroundColor: '#2b2d31', width: '100%', maxWidth: '600px', maxHeight: '90vh', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e1f22', display: 'flex', flexDirection: 'column' },
    header: { padding: '20px', backgroundColor: '#202225', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 },
    closeBtn: { background: 'none', border: 'none', color: '#bbb', cursor: 'pointer', fontSize: '1.2em', padding: '10px', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    balanceBar: { padding: '10px 12px', backgroundColor: '#2f3136', color: 'white', borderBottom: '1px solid #1e1f22', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    tabs: { display: 'flex', borderBottom: '1px solid #1e1f22', backgroundColor: '#202225', flexShrink: 0 },
    tab: { flex: 1, padding: '15px', background: 'none', border: 'none', color: '#bbb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '44px', touchAction: 'manipulation' },
    activeTab: { flex: 1, padding: '15px', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', cursor: 'pointer', borderBottom: '2px solid #5865f2', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '44px', touchAction: 'manipulation' },
    content: { padding: '20px', overflowY: 'auto', flex: 1, WebkitOverflowScrolling: 'touch', overflowX: 'hidden' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '15px', paddingBottom: '20px' },
    itemCard: { backgroundColor: '#202225', padding: '15px', borderRadius: '8px', textAlign: 'center', border: '1px solid #1e1f22', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', minHeight: '180px' },
    iconPlace: { width: 60, height: 60, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, flexShrink: 0 },
    buyBtn: { marginTop: 'auto', padding: '12px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontSize: '0.9em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, minHeight: '44px', touchAction: 'manipulation', fontWeight: '600' },
    ownedBtn: { marginTop: 'auto', padding: '12px', backgroundColor: '#40444b', color: '#aaa', border: 'none', borderRadius: '4px', width: '100%', fontSize: '0.9em', minHeight: '44px' },
    useBtn: { marginTop: 'auto', padding: '12px', backgroundColor: '#23a559', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontSize: '0.9em', minHeight: '44px', touchAction: 'manipulation', fontWeight: '600' },
    equippedBtn: { marginTop: 'auto', padding: '12px', backgroundColor: 'transparent', color: '#23a559', border: '1px solid #23a559', borderRadius: '4px', width: '100%', fontSize: '0.9em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, minHeight: '44px' },
    dailyBtn: { padding: '4px 8px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '0.75em', lineHeight: 1, minHeight: '24px', marginLeft: '8px' },
};

export default CryptoStoreModal;


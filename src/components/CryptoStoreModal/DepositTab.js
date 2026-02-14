import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { PACKAGES, DEPOSIT_ADDRESSES } from './useCryptoStore';

const DepositTab = ({ selectedPack, setSelectedPack, txid, setTxid, txidResult, loading, handleVerifyTxid, handleCopyAddress, handlePasteTxid }) => (
    <div style={{ padding: '10px', color: 'white' }}>
        <h3 style={{ marginTop: 0, color: '#f0b232' }}>{'💰'} PawsCoin Satın Al</h3>
        <p style={{ color: '#b9bbbe', fontSize: '0.9em' }}>Kripto para ile PawsCoin satın alın. Ödemenizi yaptıktan sonra işlem ID'sini (TXID) aşağıya girin.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, margin: '16px 0' }}>
            {PACKAGES.map(pkg => {
                const selected = selectedPack?.id === pkg.id;
                return (
                    <div key={pkg.id} onClick={() => setSelectedPack(pkg)}
                        style={{
                            backgroundColor: selected ? '#3b3f47' : '#202225',
                            border: `1px solid ${selected ? '#5865f2' : '#1e1f22'}`,
                            borderRadius: 10, padding: 12, cursor: 'pointer',
                            display: 'flex', flexDirection: 'column', gap: 6,
                            transition: 'border-color 0.2s, background-color 0.2s'
                        }}>
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
            <div style={{ marginBottom: 14, padding: 12, backgroundColor: '#202225', borderRadius: 8, border: '1px solid #1e1f22', color: '#b9bbbe', fontSize: '0.9em' }}>
                Seçilen paket: <strong style={{ color: 'white' }}>{selectedPack.coins.toLocaleString()} Coin</strong> {'–'}
                <span style={{ color: '#f0b232', fontWeight: 600 }}> {selectedPack.price}</span>
            </div>
        )}

        <div style={{ marginTop: 20, marginBottom: 20, padding: 15, backgroundColor: '#202225', borderRadius: 8, border: '1px solid #1e1f22' }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#5865f2' }}>{'📋'} Ödeme Bilgileri</h4>
            <div style={{ fontSize: '0.85em', color: '#b9bbbe', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {DEPOSIT_ADDRESSES.map((addr) => (
                    <div key={addr.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                            <p style={{ margin: 0 }}><strong>{addr.label}:</strong></p>
                            <button onClick={() => handleCopyAddress(addr.value)}
                                style={{ backgroundColor: '#2f3136', color: 'white', border: '1px solid #1e1f22', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: '0.8em' }}>
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
            <label style={{ display: 'block', marginBottom: 8, fontSize: '0.9em', color: '#b9bbbe' }}>{'İ'}şlem ID (TXID):</label>
            <div style={{ display: 'flex', gap: 8 }}>
                <input type="text" value={txid} onChange={(e) => setTxid(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleVerifyTxid(); } }}
                    placeholder="İşlem ID'sini buraya yapıştırın"
                    style={{ width: '100%', padding: '10px', backgroundColor: '#2b2d31', border: '1px solid #1e1f22', borderRadius: '4px', color: 'white', fontSize: '0.9em' }}
                    disabled={loading} />
                <button onClick={handlePasteTxid}
                    style={{ padding: '0 12px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
                    disabled={loading}>Yapıştır</button>
            </div>
        </div>

        <button onClick={handleVerifyTxid}
            style={{ width: '100%', padding: '12px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1em', fontWeight: '600', opacity: loading ? 0.6 : 1 }}
            disabled={loading}>
            {loading ? 'Doğrulanıyor...' : 'Doğrula ve Coin Al'}
        </button>

        {txidResult && (
            <div style={{ marginTop: 15, padding: 12, backgroundColor: txidResult.success ? '#23a55933' : '#ff5d5d33', border: `1px solid ${txidResult.success ? '#23a559' : '#ff5d5d'}`, borderRadius: 6, color: txidResult.success ? '#23a559' : '#ff5d5d' }}>
                {txidResult.success ? '✅' : '❌'} {txidResult.message}
                {txidResult.added_coins && <strong> (+{txidResult.added_coins} coin)</strong>}
            </div>
        )}
    </div>
);

export default DepositTab;

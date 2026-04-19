/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';
import { PACKAGES, DEPOSIT_ADDRESSES } from './useCryptoStore';
import { useTranslation } from 'react-i18next';

const S = {
    bg5: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#111214',
        border: '1px solid #0b0e1b',
        borderRadius: '4px',
        color: 'white',
        fontSize: '0.9em',
    },
    txt7: { display: 'block', marginBottom: 8, fontSize: '0.9em', color: '#b5bac1' },
    txt6: { fontSize: '0.75em', color: '#999', marginTop: 10 },
    bg4: {
        display: 'block',
        padding: 8,
        backgroundColor: '#111214',
        borderRadius: 4,
        wordBreak: 'break-all',
    },
    bg3: {
        backgroundColor: '#111214',
        color: 'white',
        border: '1px solid #0b0e1b',
        borderRadius: 6,
        padding: '4px 10px',
        cursor: 'pointer',
        fontSize: '0.8em',
    },
    flex2: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
    flex: {
        fontSize: '0.85em',
        color: '#b5bac1',
        lineHeight: 1.6,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    txt5: { margin: '0 0 10px 0', color: '#5865f2' },
    bg2: {
        marginTop: 20,
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#0d0e10',
        borderRadius: 8,
        border: '1px solid #0b0e1b',
    },
    bg: {
        marginBottom: 14,
        padding: 12,
        backgroundColor: '#0d0e10',
        borderRadius: 8,
        border: '1px solid #0b0e1b',
        color: '#b5bac1',
        fontSize: '0.9em',
    },
    txt4: { color: '#b5bac1', fontSize: '0.8em' },
    txt3: { fontWeight: 700, color: 'white' },
    txt2: { marginTop: 0, color: '#f0b232' },
    txt: { padding: '10px', color: 'white' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 12,
        margin: '16px 0',
    },
};

const DepositTab = ({
    selectedPack,
    setSelectedPack,
    txid,
    setTxid,
    txidResult,
    loading,
    handleVerifyTxid,
    handleCopyAddress,
    handlePasteTxid,
}) => {
    const { t } = useTranslation();
    return (
        <div style={S.txt}>
            <h3 style={S.txt2}>💰 {t('store.deposit.title', 'PawsCoin Satın Al')}</h3>
            <p className="text-b5-09em">
                {t(
                    'store.deposit.desc',
                    'Purchase PawsCoin with crypto. After making your payment, enter your transaction ID below.'
                )}
            </p>

            <div style={S.grid}>
                {PACKAGES.map((pkg) => {
                    const selected = selectedPack?.id === pkg.id;
                    return (
                        <div
                            key={pkg.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedPack(pkg)}
                            style={{
                                backgroundColor: selected ? '#3b3f47' : '#0d0e10',
                                border: `1px solid ${selected ? '#5865f2' : '#0d0e10'}`,
                                borderRadius: 10,
                                padding: 12,
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 6,
                                transition: 'border-color 0.2s, background-color 0.2s',
                            }}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <div className="flex-between-center">
                                <span style={S.txt3}>{pkg.coins.toLocaleString()} Coin</span>
                                {selected && <FaCheck color="#23a559" />}
                            </div>
                            <div className="primary-fw600">{pkg.price}</div>
                            <div style={S.txt4}>{pkg.note}</div>
                        </div>
                    );
                })}
            </div>

            {selectedPack && (
                <div style={S.bg}>
                    {t('store.deposit.selectedPackage', 'Seçilen paket')}:{' '}
                    <strong className="text-white">
                        {selectedPack.coins.toLocaleString()} Coin
                    </strong>{' '}
                    –<span className="primary-fw600"> {selectedPack.price}</span>
                </div>
            )}

            <div style={S.bg2}>
                <h4 style={S.txt5}>📋 {t('store.deposit.paymentInfo', 'Ödeme Bilgileri')}</h4>
                <div style={S.flex}>
                    {DEPOSIT_ADDRESSES.map((addr) => (
                        <div key={addr.label} className="flex-col-gap6">
                            <div style={S.flex2}>
                                <p className="m-0">
                                    <strong>{addr.label}:</strong>
                                </p>
                                <button onClick={() => handleCopyAddress(addr.value)} style={S.bg3}>
                                    {t('ui.copy', 'Copy')}
                                </button>
                            </div>
                            <code style={S.bg4}>{addr.value}</code>
                        </div>
                    ))}
                </div>
                <p style={S.txt6}>
                    {t(
                        'store.deposit.txidNote',
                        'After payment, enter your transaction ID (TXID) below. Note: The selected package info is for reference only, TXID verification does not auto-detect the amount.'
                    )}
                </p>
            </div>

            <div className="mb-15">
                <label style={S.txt7}>
                    {t('store.deposit.txidLabel', 'Transaction ID (TXID)')}:
                </label>
                <div className="flex-gap-8n">
                    <input
                        type="text"
                        value={txid}
                        onChange={(e) => setTxid(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleVerifyTxid();
                            }
                        }}
                        placeholder={t(
                            'store.deposit.txidPlaceholder',
                            "İşlem ID'nizi buraya yapıştırın"
                        )}
                        style={S.bg5}
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
                            opacity: loading ? 0.6 : 1,
                        }}
                        disabled={loading}
                    >
                        {t('ui.paste', 'Paste')}
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
                    opacity: loading ? 0.6 : 1,
                }}
                disabled={loading}
            >
                {loading
                    ? t('ui.verifying', 'Doğrulanıyor...')
                    : t('store.deposit.verifyAndClaim', 'Doğrula & Coin Al')}
            </button>

            {txidResult && (
                <div
                    style={{
                        marginTop: 15,
                        padding: 12,
                        backgroundColor: txidResult.success ? '#23a55933' : '#ff5d5d33',
                        border: `1px solid ${txidResult.success ? '#23a559' : '#ff5d5d'}`,
                        borderRadius: 6,
                        color: txidResult.success ? '#23a559' : '#ff5d5d',
                    }}
                >
                    {txidResult.success ? '✅' : '❌'} {txidResult.message}
                    {txidResult.added_coins && <strong> (+{txidResult.added_coins} coin)</strong>}
                </div>
            )}
        </div>
    );
};

DepositTab.propTypes = {
    selectedPack: PropTypes.object,
    setSelectedPack: PropTypes.func,
    txid: PropTypes.string,
    setTxid: PropTypes.func,
    txidResult: PropTypes.object,
    loading: PropTypes.bool,
    handleVerifyTxid: PropTypes.func,
    handleCopyAddress: PropTypes.func,
    handlePasteTxid: PropTypes.func,
};
export default DepositTab;

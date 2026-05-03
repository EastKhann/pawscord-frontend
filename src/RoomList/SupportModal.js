import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaHeart, FaCoffee, FaBitcoin, FaCopy, FaTimes } from '../utils/iconOptimization';
import useModalA11y from '../hooks/useModalA11y';
import './SupportModal.css';

const cryptoAddresses = {
    sol: 'Bk6ywhae86fp6BHmGtxabS6ncEGsFxhcnZEWJRZLVr9z',
    eth: '0xeaa14d4651a8ea7488289209b9294a1309dde37c',
    usdt: 'TGAny6VmDAWdVmTXCPrpsbLKKQQdvyvnWC',
    coffee: 'https://buymeacoffee.com/dogudoguweo',
};

const SupportModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [copiedAddress, setCopiedAddress] = useState(null);
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: !!isOpen,
        label: t('support.title'),
    });

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedAddress(type);
            setTimeout(() => setCopiedAddress(null), 2000);
        }).catch(() => {
            // clipboard API unavailable; fail silently
        });
    };

    if (!isOpen) return null;

    return (
        <div style={S.overlay} {...overlayProps}>
            <div style={S.modal} className="support-modal" data-testid="support-modal" {...dialogProps}>
                {/* Header with gradient accent */}
                <div style={S.headerBanner}>
                    <div style={S.headerContent}>
                        <span className="support-heart">
                            <FaHeart color="#eb459e" size={28} />
                        </span>
                        <div>
                            <h3 style={S.title}>{t('support.title')}</h3>
                            <p style={S.headerSub}>
                                {t('support.thankYou', 'Her destek bizi motive ediyor!')}
                            </p>
                        </div>
                    </div>
                    <button aria-label={t('common.close')} onClick={onClose} style={S.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                {/* Buy Me a Coffee - Featured */}
                <div
                    style={S.coffeeCard}
                    className="support-coffee-card"
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,221,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                    }}
                >
                    <div style={S.coffeeLeft}>
                        <div style={S.coffeeIcon}>
                            <FaCoffee color="#FFDD00" size={28} />
                        </div>
                        <div>
                            <div style={S.coffeeName}>Buy Me a Coffee</div>
                            <div style={S.coffeeDesc}>{t('support.easiestMethod')}</div>
                        </div>
                    </div>
                    <button
                        aria-label={t('support.buyCoffee')}
                        onClick={() => window.open(cryptoAddresses.coffee, '_blank', 'noopener,noreferrer')}
                        style={S.coffeeBtn}
                    >
                        ☕ {t('support.buyCoffee')}
                    </button>
                </div>

                {/* Donation tier presets */}
                <div style={S.tierSection}>
                    <p style={S.tierLabel}>{t('support.chooseTier', 'Bir miktar seç:')}</p>
                    <div style={S.tierRow}>
                        {[5, 20, 50, 100].map((amount) => (
                            <button
                                key={amount}
                                aria-label={`${amount}₺ ${t('support.donate', 'bağış yap')}`}
                                onClick={() => window.open(`${cryptoAddresses.coffee}?amount=${amount}`, '_blank', 'noopener,noreferrer')}
                                style={S.tierBtn}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,221,0,0.2)';
                                    e.currentTarget.style.borderColor = '#FFDD00';
                                    e.currentTarget.style.color = '#FFDD00';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.borderColor = 'rgba(255,221,0,0.3)';
                                    e.currentTarget.style.color = '#b5bac1';
                                }}
                            >
                                {amount}₺
                            </button>
                        ))}
                    </div>
                </div>

                {/* Crypto Section */}
                <div style={S.cryptoSection} className="support-crypto-section">
                    <h4 style={S.cryptoTitle}>
                        <FaBitcoin color="#f7931a" /> {t('support.cryptoSupport')}
                    </h4>

                    {[
                        {
                            key: 'sol',
                            name: 'Solana',
                            ticker: 'SOL',
                            color: '#9945FF',
                            gradient: 'rgba(153,69,255,0.1)',
                        },
                        {
                            key: 'eth',
                            name: 'Ethereum',
                            ticker: 'ETH',
                            color: '#627EEA',
                            gradient: 'rgba(98,126,234,0.1)',
                        },
                        {
                            key: 'usdt',
                            name: 'USDT',
                            ticker: 'TRC20',
                            color: '#26A17B',
                            gradient: 'rgba(38,161,123,0.1)',
                        },
                    ].map((crypto) => (
                        <div
                            key={crypto.key}
                            style={{
                                ...S.cryptoCard,
                                background: crypto.gradient,
                                borderColor: `${crypto.color}22`,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = `${crypto.color}55`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = `${crypto.color}22`;
                            }}
                        >
                            <div style={S.cryptoHeader}>
                                <span style={{ ...S.cryptoName, color: crypto.color }}>
                                    {crypto.name} ({crypto.ticker})
                                </span>
                                <button
                                    aria-label={t('common.copy')}
                                    onClick={() =>
                                        copyToClipboard(cryptoAddresses[crypto.key], crypto.key)
                                    }
                                    style={{ ...S.copyBtn, color: crypto.color }}
                                >
                                    {copiedAddress === crypto.key ? (
                                        <span style={{ color: '#3ddc84' }}>
                                            ✓ {t('common.copied')}
                                        </span>
                                    ) : (
                                        <>
                                            <FaCopy /> {t('common.copy')}
                                        </>
                                    )}
                                </button>
                            </div>
                            <div style={S.cryptoAddr}>{cryptoAddresses[crypto.key]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const S = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(6px)',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box',
    },
    modal: {
        background: 'linear-gradient(180deg, #1e1f23 0%, #111214 100%)',
        width: '100%',
        maxWidth: '480px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
    },
    headerBanner: {
        background: 'linear-gradient(135deg, rgba(235,69,158,0.15) 0%, rgba(88,101,242,0.15) 100%)',
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    headerContent: { display: 'flex', alignItems: 'center', gap: '14px' },
    title: { margin: 0, color: '#fff', fontSize: '1.25em', fontWeight: 700 },
    headerSub: { margin: '4px 0 0 0', color: '#949ba4', fontSize: '0.85em' },
    closeBtn: {
        background: 'rgba(255,255,255,0.06)',
        border: 'none',
        color: '#b5bac1',
        fontSize: '1em',
        cursor: 'pointer',
        borderRadius: '50%',
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    coffeeCard: {
        margin: '20px 20px 0',
        padding: '18px',
        background: 'linear-gradient(135deg, rgba(255,221,0,0.08) 0%, rgba(255,165,0,0.05) 100%)',
        borderRadius: '12px',
        border: '1px solid rgba(255,221,0,0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        transition: 'transform 0.25s, box-shadow 0.25s',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    },
    coffeeLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    coffeeIcon: {
        width: 48,
        height: 48,
        borderRadius: '12px',
        background: 'rgba(255,221,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    coffeeName: { fontWeight: 600, color: '#fff', fontSize: '1em' },
    coffeeDesc: { fontSize: '0.82em', color: '#949ba4', marginTop: '2px' },
    coffeeBtn: {
        padding: '10px 20px',
        background: 'linear-gradient(135deg, #FFDD00 0%, #FFA500 100%)',
        color: '#000',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '0.9em',
        transition: 'opacity 0.2s',
        whiteSpace: 'nowrap',
    },
    cryptoSection: { padding: '20px' },
    tierSection: { padding: '0 20px 16px 20px' },
    tierLabel: { margin: '0 0 8px 0', color: '#949ba4', fontSize: '0.82em', fontWeight: 600 },
    tierRow: { display: 'flex', gap: '8px' },
    tierBtn: {
        flex: 1,
        padding: '8px 4px',
        border: '1px solid rgba(255,221,0,0.3)',
        borderRadius: '8px',
        background: 'transparent',
        color: '#b5bac1',
        cursor: 'pointer',
        fontWeight: 700,
        fontSize: '0.9em',
        transition: 'all 0.15s ease',
    },
    cryptoTitle: {
        margin: '0 0 14px 0',
        color: '#dbdee1',
        fontSize: '1em',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    cryptoCard: {
        padding: '14px',
        borderRadius: '10px',
        marginBottom: '10px',
        border: '1px solid transparent',
        transition: 'border-color 0.2s',
    },
    cryptoHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
    },
    cryptoName: { fontWeight: 600, fontSize: '0.9em' },
    copyBtn: {
        padding: '4px 10px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '0.82em',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    cryptoAddr: {
        color: '#8e9297',
        fontSize: '0.78em',
        fontFamily: 'monospace',
        wordBreak: 'break-all',
        lineHeight: 1.5,
    },
};

SupportModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
};
export default SupportModal;

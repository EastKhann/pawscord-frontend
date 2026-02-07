// frontend/src/components/SubscriptionManager.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaCrown, FaCreditCard, FaCheck, FaHistory, FaBan, FaGift, FaArrowRight } from 'react-icons/fa';

const SubscriptionManager = ({ fetchWithAuth, apiBaseUrl, username, onClose }) => {
    const [activeTab, setActiveTab] = useState('current');
    const [subscriptions, setSubscriptions] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSubscriptions();
    }, []);

    const loadSubscriptions = async () => {
        setLoading(true);
        try {
            // Simulated subscription data
            setSubscriptions([
                {
                    id: 1,
                    name: 'Pawscord Nitro',
                    tier: 'premium',
                    price: '$9.99/ay',
                    status: 'active',
                    nextBilling: '2026-03-15',
                    features: ['HD Video', 'Özel Emojiler', '100MB Upload', 'Profil Banner'],
                    icon: '💎'
                },
                {
                    id: 2,
                    name: 'Server Boost',
                    tier: 'boost',
                    price: '$4.99/ay',
                    status: 'active',
                    nextBilling: '2026-03-20',
                    features: ['Seviye 1 Boost', '50 Ekstra Emoji Slotu', 'HD Ses'],
                    icon: '🚀'
                }
            ]);
            setHistory([
                { id: 1, date: '2026-02-15', description: 'Pawscord Nitro - Aylık', amount: '$9.99', status: 'paid' },
                { id: 2, date: '2026-01-15', description: 'Pawscord Nitro - Aylık', amount: '$9.99', status: 'paid' },
                { id: 3, date: '2026-01-20', description: 'Server Boost', amount: '$4.99', status: 'paid' },
                { id: 4, date: '2025-12-15', description: 'Pawscord Nitro - Aylık', amount: '$9.99', status: 'paid' },
            ]);
        } catch (err) {
            console.error('Subscription load error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = (subId) => {
        if (window.confirm('Bu aboneliği iptal etmek istediğinize emin misiniz?')) {
            setSubscriptions(prev => prev.map(s =>
                s.id === subId ? { ...s, status: 'cancelled' } : s
            ));
        }
    };

    const handleResume = (subId) => {
        setSubscriptions(prev => prev.map(s =>
            s.id === subId ? { ...s, status: 'active' } : s
        ));
    };

    const plans = [
        {
            name: 'Ücretsiz',
            price: '$0',
            features: ['Temel Sohbet', '8MB Upload', 'Standart Ses'],
            color: '#747f8d',
            current: false
        },
        {
            name: 'Nitro Basic',
            price: '$2.99/ay',
            features: ['50MB Upload', 'Özel Emoji Kullanımı', 'Profil Banner', 'HD Video'],
            color: '#5865f2',
            current: false
        },
        {
            name: 'Nitro',
            price: '$9.99/ay',
            features: ['100MB Upload', 'Tüm Emojiler', 'Profil Banner', '2 Server Boost', 'HD Video 4K', 'Özel Etiket'],
            color: '#eb459e',
            current: true
        }
    ];

    const tabs = [
        { id: 'current', label: 'Mevcut Abonelikler', icon: <FaCrown /> },
        { id: 'plans', label: 'Planlar', icon: <FaGift /> },
        { id: 'history', label: 'Ödeme Geçmişi', icon: <FaHistory /> },
        { id: 'payment', label: 'Ödeme Yöntemleri', icon: <FaCreditCard /> },
    ];

    return (
        <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <h2 style={styles.title}>📋 Abonelik Yönetimi</h2>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                <div style={styles.tabs}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                ...styles.tab,
                                ...(activeTab === tab.id ? styles.tabActive : {})
                            }}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : (
                        <>
                            {activeTab === 'current' && (
                                <div style={styles.subscriptionsList}>
                                    {subscriptions.length === 0 ? (
                                        <div style={styles.empty}>Aktif aboneliğiniz bulunmuyor</div>
                                    ) : subscriptions.map(sub => (
                                        <div key={sub.id} style={styles.subCard}>
                                            <div style={styles.subHeader}>
                                                <span style={{ fontSize: '24px' }}>{sub.icon}</span>
                                                <div>
                                                    <h3 style={styles.subName}>{sub.name}</h3>
                                                    <span style={styles.subPrice}>{sub.price}</span>
                                                </div>
                                                <span style={{
                                                    ...styles.statusBadge,
                                                    backgroundColor: sub.status === 'active' ? 'rgba(59,165,93,0.2)' : 'rgba(237,66,69,0.2)',
                                                    color: sub.status === 'active' ? '#3ba55d' : '#ed4245'
                                                }}>
                                                    {sub.status === 'active' ? 'Aktif' : 'İptal Edildi'}
                                                </span>
                                            </div>
                                            <div style={styles.subFeatures}>
                                                {sub.features.map((f, i) => (
                                                    <span key={i} style={styles.feature}>
                                                        <FaCheck style={{ color: '#3ba55d', fontSize: '10px' }} /> {f}
                                                    </span>
                                                ))}
                                            </div>
                                            <div style={styles.subFooter}>
                                                <span style={styles.nextBilling}>
                                                    Sonraki fatura: {sub.nextBilling}
                                                </span>
                                                {sub.status === 'active' ? (
                                                    <button onClick={() => handleCancel(sub.id)} style={styles.cancelBtn}>
                                                        <FaBan /> İptal Et
                                                    </button>
                                                ) : (
                                                    <button onClick={() => handleResume(sub.id)} style={styles.resumeBtn}>
                                                        <FaArrowRight /> Devam Ettir
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'plans' && (
                                <div style={styles.plansGrid}>
                                    {plans.map((plan, i) => (
                                        <div key={i} style={{
                                            ...styles.planCard,
                                            border: plan.current ? `2px solid ${plan.color}` : '1px solid rgba(255,255,255,0.1)'
                                        }}>
                                            {plan.current && <div style={{ ...styles.currentBadge, backgroundColor: plan.color }}>Mevcut Plan</div>}
                                            <h3 style={{ ...styles.planName, color: plan.color }}>{plan.name}</h3>
                                            <div style={styles.planPrice}>{plan.price}</div>
                                            <div style={styles.planFeatures}>
                                                {plan.features.map((f, j) => (
                                                    <div key={j} style={styles.planFeature}>
                                                        <FaCheck style={{ color: plan.color, fontSize: '10px' }} /> {f}
                                                    </div>
                                                ))}
                                            </div>
                                            {!plan.current && (
                                                <button style={{ ...styles.upgradeBtn, backgroundColor: plan.color }}>
                                                    Yükselt
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'history' && (
                                <div style={styles.historyList}>
                                    <table style={styles.table}>
                                        <thead>
                                            <tr>
                                                <th style={styles.th}>Tarih</th>
                                                <th style={styles.th}>Açıklama</th>
                                                <th style={styles.th}>Tutar</th>
                                                <th style={styles.th}>Durum</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {history.map(item => (
                                                <tr key={item.id}>
                                                    <td style={styles.td}>{item.date}</td>
                                                    <td style={styles.td}>{item.description}</td>
                                                    <td style={styles.td}>{item.amount}</td>
                                                    <td style={styles.td}>
                                                        <span style={styles.paidBadge}>✅ Ödendi</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === 'payment' && (
                                <div style={styles.paymentSection}>
                                    <h3 style={styles.sectionTitle}>Kayıtlı Ödeme Yöntemleri</h3>
                                    <div style={styles.paymentMethods}>
                                        <div style={styles.paymentCard}>
                                            <FaCreditCard style={{ fontSize: '24px', color: '#5865f2' }} />
                                            <div>
                                                <div style={{ color: '#fff', fontWeight: 'bold' }}>•••• •••• •••• 4242</div>
                                                <div style={{ color: '#72767d', fontSize: '12px' }}>Son kullanma: 12/28</div>
                                            </div>
                                            <span style={styles.defaultBadge}>Varsayılan</span>
                                        </div>
                                    </div>
                                    <button style={styles.addPaymentBtn}>
                                        <FaCreditCard /> Yeni Ödeme Yöntemi Ekle
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        backdropFilter: 'blur(4px)'
    },
    modal: {
        backgroundColor: '#36393f', borderRadius: '12px', width: '90%', maxWidth: '800px',
        maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column'
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)'
    },
    title: { margin: 0, color: '#fff', fontSize: '1.3em' },
    closeBtn: {
        background: 'none', border: 'none', color: '#b9bbbe', fontSize: '20px', cursor: 'pointer'
    },
    tabs: {
        display: 'flex', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        gap: '4px', overflowX: 'auto'
    },
    tab: {
        display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 16px',
        background: 'none', border: 'none', borderBottom: '2px solid transparent',
        color: '#8e9297', cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap'
    },
    tabActive: {
        color: '#fff', borderBottomColor: '#5865f2'
    },
    content: { flex: 1, overflow: 'auto', padding: '20px 24px' },
    loading: { textAlign: 'center', color: '#72767d', padding: '40px' },
    empty: { textAlign: 'center', color: '#72767d', padding: '40px' },
    subscriptionsList: { display: 'flex', flexDirection: 'column', gap: '16px' },
    subCard: {
        backgroundColor: '#2f3136', borderRadius: '8px', padding: '20px',
        border: '1px solid rgba(255,255,255,0.06)'
    },
    subHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' },
    subName: { margin: 0, color: '#fff', fontSize: '16px' },
    subPrice: { color: '#72767d', fontSize: '13px' },
    statusBadge: { padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold', marginLeft: 'auto' },
    subFeatures: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' },
    feature: { display: 'flex', alignItems: 'center', gap: '4px', color: '#b9bbbe', fontSize: '12px' },
    subFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' },
    nextBilling: { color: '#72767d', fontSize: '12px' },
    cancelBtn: {
        display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
        backgroundColor: 'rgba(237,66,69,0.2)', color: '#ed4245', border: '1px solid rgba(237,66,69,0.4)',
        borderRadius: '4px', cursor: 'pointer', fontSize: '13px'
    },
    resumeBtn: {
        display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
        backgroundColor: 'rgba(59,165,93,0.2)', color: '#3ba55d', border: '1px solid rgba(59,165,93,0.4)',
        borderRadius: '4px', cursor: 'pointer', fontSize: '13px'
    },
    plansGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' },
    planCard: {
        backgroundColor: '#2f3136', borderRadius: '12px', padding: '24px',
        position: 'relative', textAlign: 'center'
    },
    currentBadge: { position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', padding: '2px 12px', borderRadius: '0 0 8px 8px', color: '#fff', fontSize: '10px', fontWeight: 'bold' },
    planName: { margin: '12px 0 8px', fontSize: '18px' },
    planPrice: { color: '#fff', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' },
    planFeatures: { textAlign: 'left' },
    planFeature: { display: 'flex', alignItems: 'center', gap: '8px', color: '#b9bbbe', fontSize: '13px', marginBottom: '8px' },
    upgradeBtn: { width: '100%', padding: '10px', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontWeight: 'bold', marginTop: '16px', fontSize: '14px' },
    historyList: { overflow: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '10px', color: '#72767d', fontSize: '12px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.06)' },
    td: { padding: '12px 10px', color: '#dcddde', fontSize: '13px', borderBottom: '1px solid rgba(255,255,255,0.04)' },
    paidBadge: { fontSize: '12px' },
    paymentSection: {},
    sectionTitle: { color: '#fff', fontSize: '16px', marginBottom: '16px' },
    paymentMethods: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' },
    paymentCard: {
        display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
        backgroundColor: '#2f3136', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)'
    },
    defaultBadge: { marginLeft: 'auto', padding: '2px 8px', backgroundColor: 'rgba(88,101,242,0.2)', color: '#5865f2', borderRadius: '4px', fontSize: '11px' },
    addPaymentBtn: {
        display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
        backgroundColor: '#5865f2', color: '#fff', border: 'none', borderRadius: '4px',
        cursor: 'pointer', fontSize: '14px'
    }
};

export default SubscriptionManager;




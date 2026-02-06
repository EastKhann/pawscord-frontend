// frontend/src/components/SubscriptionManager.js
export default SubscriptionManager;

};
    }
        color: '#dcddde'
        cursor: 'pointer',
        borderRadius: '8px',
        padding: '12px 20px',
        backgroundColor: '#36393f',
        gap: '8px',
        alignItems: 'center',
        display: 'flex',
    paymentOption: {
    },
        flexWrap: 'wrap'
        gap: '16px',
        display: 'flex',
    paymentMethods: {
    },
        marginBottom: '20px'
    paymentSection: {
    },
        fontWeight: 'bold'
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '4px',
        padding: '12px',
        border: 'none',
        color: '#ffffff',
        backgroundColor: '#5865f2',
    subscribeButton: {
    },
        marginBottom: '8px'
        fontSize: '14px',
        color: '#dcddde',
        gap: '8px',
        alignItems: 'center',
        display: 'flex',
    feature: {
    },
        marginBottom: '20px'
        flex: 1,
    planFeatures: {
    },
        fontWeight: 'normal'
        color: '#b9bbbe',
        fontSize: '16px',
    planPeriod: {
    },
        fontWeight: 'bold'
        fontSize: '32px',
        color: '#ffffff',
    planPrice: {
    },
        borderBottom: '1px solid #202225'
        paddingBottom: '16px',
        marginBottom: '20px',
    planHeader: {
    },
        flexDirection: 'column'
        display: 'flex',
        borderRadius: '8px',
        padding: '24px',
        backgroundColor: '#36393f',
    planCard: {
    },
        gap: '20px'
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        display: 'grid',
    plansGrid: {
    },
        marginBottom: '32px'
    plansSection: {
    },
        fontSize: '14px'
        cursor: 'pointer',
        borderRadius: '4px',
        padding: '10px 20px',
        border: 'none',
        color: '#ffffff',
        backgroundColor: '#ed4245',
    cancelButton: {
    },
        marginTop: '8px'
        fontSize: '14px',
        color: '#3ba55d',
    renewInfo: {
    },
        marginBottom: '4px'
        fontSize: '14px',
        color: '#b9bbbe',
    subMeta: {
    },
        fontSize: '12px'
        borderRadius: '4px',
        padding: '4px 8px',
        color: '#ffffff',
        backgroundColor: '#3ba55d',
    activeBadge: {
    },
        gap: '12px'
        alignItems: 'center',
        display: 'flex',
        marginBottom: '8px',
        fontWeight: 'bold',
        fontSize: '18px',
        color: '#ffffff',
    planName: {
    },
        flex: 1
    subInfo: {
    },
        alignItems: 'center'
        justifyContent: 'space-between',
        display: 'flex',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#36393f',
    subCard: {
    },
        marginBottom: '16px'
        fontSize: '18px',
        color: '#ffffff',
    sectionTitle: {
    },
        marginBottom: '32px'
    currentSubscription: {
    },
        color: '#b9bbbe'
        padding: '40px',
        textAlign: 'center',
    loading: {
    },
        padding: '20px'
        overflowY: 'auto',
        flex: 1,
    content: {
    },
        padding: '8px'
        cursor: 'pointer',
        color: '#b9bbbe',
        border: 'none',
        background: 'none',
    closeButton: {
    },
        color: '#ffffff'
        fontSize: '20px',
        margin: 0,
    title: {
    },
        gap: '12px'
        alignItems: 'center',
        display: 'flex',
    headerLeft: {
    },
        borderBottom: '1px solid #202225'
        padding: '20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
    header: {
    },
        flexDirection: 'column'
        display: 'flex',
        maxHeight: '90vh',
        maxWidth: '1000px',
        width: '100%',
        borderRadius: '8px',
        backgroundColor: '#2f3136',
    panel: {
    },
        padding: '20px'
        zIndex: 10000,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        position: 'fixed',
    overlay: {
const styles = {

};
    );
        </div>
            </div>
                )}
                    </div>
                        </div>
                            </div>
                                </label>
                                    <span>Kripto Para</span>
                                    <span>💰</span>
                                    />
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        checked={paymentMethod === 'crypto'}
                                        value="crypto"
                                        type="radio"
                                    <input
                                <label style={styles.paymentOption}>
                                </label>
                                    <span>Kredi Kartı</span>
                                    <FaCreditCard size={16} />
                                    />
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        checked={paymentMethod === 'card'}
                                        value="card"
                                        type="radio"
                                    <input
                                <label style={styles.paymentOption}>
                            <div style={styles.paymentMethods}>
                            <h3 style={styles.sectionTitle}>Ödeme Yöntemi</h3>
                        <div style={styles.paymentSection}>
                        {/* Payment Methods */}

                        </div>
                            </div>
                                ))}
                                    </div>
                                        )}
                                            </button>
                                                Satın Al
                                            >
                                                style={styles.subscribeButton}
                                                onClick={() => subscribe(plan.id)}
                                            <button
                                        {subscription?.plan_id !== plan.id && plan.price > 0 && (

                                        </div>
                                            ))}
                                                </div>
                                                    <span>{feature}</span>
                                                    <FaCheck size={12} color="#3ba55d" />
                                                <div key={idx} style={styles.feature}>
                                            {getPlanFeatures(plan.type).map((feature, idx) => (
                                        <div style={styles.planFeatures}>

                                        </div>
                                            </div>
                                                <span style={styles.planPeriod}>/ay</span>
                                                ${plan.price}
                                            <div style={styles.planPrice}>
                                            <h4 style={styles.planName}>{plan.name}</h4>
                                        <div style={styles.planHeader}>
                                    >
                                        }}
                                                : '1px solid #202225'
                                                ? '2px solid #5865f2'
                                            border: subscription?.plan_id === plan.id
                                            ...styles.planCard,
                                        style={{
                                        key={plan.id}
                                    <div
                                {plans.map(plan => (
                            <div style={styles.plansGrid}>
                            <h3 style={styles.sectionTitle}>Planlar</h3>
                        <div style={styles.plansSection}>
                        {/* Available Plans */}

                        )}
                            </div>
                                </div>
                                    )}
                                        </button>
                                            Aboneliği İptal Et
                                        >
                                            style={styles.cancelButton}
                                            onClick={cancelSubscription}
                                        <button
                                    {subscription.is_active && (
                                    </div>
                                        )}
                                            </div>
                                                ✅ Otomatik yenileme açık
                                            <div style={styles.renewInfo}>
                                        {subscription.auto_renew && (
                                        </div>
                                            Bitiş: {new Date(subscription.end_date).toLocaleDateString('tr-TR')}
                                        <div style={styles.subMeta}>
                                        </div>
                                            Başlangıç: {new Date(subscription.start_date).toLocaleDateString('tr-TR')}
                                        <div style={styles.subMeta}>
                                        </div>
                                            )}
                                                <span style={styles.activeBadge}>Aktif</span>
                                            {subscription.is_active && (
                                            {subscription.plan_name}
                                        <div style={styles.planName}>
                                    <div style={styles.subInfo}>
                                <div style={styles.subCard}>
                                <h3 style={styles.sectionTitle}>Mevcut Abonelik</h3>
                            <div style={styles.currentSubscription}>
                        {subscription && (
                        {/* Current Subscription */}
                    <div style={styles.content}>
                ) : (
                    <div style={styles.loading}>Yükleniyor...</div>
                {loading ? (

                </div>
                    </button>
                        <FaTimes size={20} />
                    <button onClick={onClose} style={styles.closeButton}>
                    </div>
                        <h2 style={styles.title}>Abonelik Yönetimi</h2>
                        <FaCrown size={24} color="#faa61a" />
                    <div style={styles.headerLeft}>
                <div style={styles.header}>
            <div style={styles.panel}>
        <div style={styles.overlay}>
    return (

    };
        return features[planType] || [];
        };
            ]
                'Beta özellikleri'
                'Öncelikli destek',
                'Analytics dashboard',
                'Özel vanity URL',
                'Sunucu boost hakları',
                '2 GB dosya yükleme',
                'Tüm premium özellikler',
            boost: [
            ],
                'Tema mağazası erişimi'
                'Sınırsız sunucu',
                'Yüksek kalite ses',
                'Özel rozetler',
                'Animasyonlu avatar',
                'Özel emoji\'ler',
                '500 MB dosya yükleme',
                'Tüm temel özellikler',
            premium: [
            ],
                '5 sunucu üyeliği'
                'Standart emoji\'ler',
                '100 MB dosya yükleme',
                'Temel mesajlaşma',
            free: [
        const features = {
    const getPlanFeatures = (planType) => {

    };
        }
            console.error('Cancel error:', error);
        } catch (error) {
            }
                loadSubscriptionData();
                alert('Abonelik iptal edildi. Mevcut dönem sonuna kadar kullanabilirsiniz.');
            if (res.ok) {

            });
                method: 'POST'
            const res = await fetchWithAuth(`${apiBaseUrl}/subscription/cancel/`, {
        try {

        if (!confirm('Aboneliğinizi iptal etmek istediğinize emin misiniz?')) return;
    const cancelSubscription = async () => {

    };
        }
            alert('Abonelik oluşturulurken hata oluştu');
            console.error('Subscribe error:', error);
        } catch (error) {
            }
                alert(`Hata: ${error.message}`);
                const error = await res.json();
            } else {
                }
                    loadSubscriptionData();
                    alert('Abonelik başarıyla oluşturuldu!');
                } else {
                    window.open(data.payment_url, '_blank');
                if (data.payment_url) {
                const data = await res.json();
            if (res.ok) {

            });
                })
                    payment_method: paymentMethod
                    plan_id: planId,
                body: JSON.stringify({
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            const res = await fetchWithAuth(`${apiBaseUrl}/subscription/subscribe/`, {
        try {
    const subscribe = async (planId) => {

    };
        setLoading(false);
        }
            console.error('Subscription load error:', error);
        } catch (error) {
            }
                setPlans(plansData.plans || []);
                const plansData = await plansRes.json();
            if (plansRes.ok) {

            }
                setSubscription(subData.subscription);
                const subData = await subRes.json();
            if (subRes.ok) {

            ]);
                fetchWithAuth(`${apiBaseUrl}/subscription/plans/`)
                fetchWithAuth(`${apiBaseUrl}/subscription/current/`),
            const [subRes, plansRes] = await Promise.all([
        try {
        setLoading(true);
    const loadSubscriptionData = async () => {

    }, []);
        loadSubscriptionData();
    useEffect(() => {

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [plans, setPlans] = useState([]);
    const [subscription, setSubscription] = useState(null);
const SubscriptionManager = ({ onClose, fetchWithAuth, apiBaseUrl, currentUser }) => {

import { FaCrown, FaTimes, FaCheck, FaCreditCard, FaHistory } from 'react-icons/fa';
//frontend/src/components/SubscriptionManager.js
import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import toast from '../utils/toast';




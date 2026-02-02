import React, { useState, useEffect } from 'react';
import { FaTimes, FaCoins, FaStar, FaCrown, FaCheck } from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import toast from '../utils/toast';

const CoinStoreModal = ({ onClose, currentCoins, onPurchaseComplete }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || getApiBase();
  const token = localStorage.getItem('access_token'); // ✅ 'token' → 'access_token'

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/coins/packages/`);
      const data = await response.json();
      console.log('💰 [COIN PACKAGES] Response:', data);
      if (data.success) {
        setPackages(data.packages);
      }
    } catch (error) {
      console.error('❌ Coin paketleri yüklenemedi:', error);
    }
  };

  const handlePurchase = async (pkg) => {
    setSelectedPackage(pkg.id);
    setLoading(true);

    console.log('🔑 [COIN PURCHASE] Token:', token ? 'EXISTS' : 'MISSING');
    console.log('📦 [COIN PURCHASE] Package ID:', pkg.id);

    try {
      // Stripe checkout
      const response = await fetch(`${API_BASE_URL}/coins/checkout/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          package_id: pkg.id,
          payment_method: 'stripe' // Stripe ödeme ekranına yönlendir
        })
      });

      const data = await response.json();
      console.log('🛒 [COIN PURCHASE] Response:', data);

      if (data.success) {
        if (data.test_mode) {
          // Test modu - direkt eklendi
          toast.success(`✅ ${pkg.coins + (pkg.bonus || 0)} coin eklendi!\n\nYeni bakiye: ${data.new_balance} coin`, {
            duration: 4000
          });
          if (onPurchaseComplete) {
            onPurchaseComplete(data.new_balance);
          }
          onClose();
        } else {
          // Stripe checkout - yönlendir
          window.location.href = data.checkout_url;
        }
      }
    } catch (error) {
      console.error('❌ Satın alma hatası:', error);
      toast.error('Satın alma başarısız oldu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
      setSelectedPackage(null);
    }
  };

  const getPackageIcon = (icon) => {
    const iconMap = {
      '💰': FaCoins,
      '💎': GiSparkles,
      '👑': FaCrown,
      '🌟': FaStar
    };
    return iconMap[icon] || FaCoins;
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
        animation: 'fadeIn 0.2s ease-in'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'linear-gradient(135deg, #2a2d35 0%, #1e2024 100%)',
          borderRadius: '24px',
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(255, 215, 0, 0.1)',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          animation: 'slideUp 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div style={{
          position: 'sticky',
          top: 0,
          background: 'linear-gradient(135deg, #2a2d35 0%, #1e2024 100%)',
          borderBottom: '2px solid rgba(255, 215, 0, 0.15)',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
          borderRadius: '24px 24px 0 0'
        }}>
          <div>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px'
            }}>
              <FaCoins style={{ fontSize: '36px', color: '#ffd700', filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))' }} />
              💰 Coin Mağazası
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#b9bbbe',
              marginTop: '4px'
            }}>
              Mevcut bakiye: <span style={{
                color: '#ffd700',
                fontWeight: 'bold',
                fontSize: '16px',
                textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
              }}>{currentCoins?.toLocaleString() || 0}</span> coin
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              color: '#b9bbbe',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.color = '#ffffff';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.color = '#b9bbbe';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <FaTimes style={{ fontSize: '24px' }} />
          </button>
        </div>

        {/* Packages Grid */}
        <div style={{ padding: '32px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {packages.map((pkg) => {
              const Icon = getPackageIcon(pkg.icon);
              const totalCoins = pkg.coins + (pkg.bonus || 0);
              const isPopular = pkg.popular;
              const isLoading = loading && selectedPackage === pkg.id;

              return (
                <div
                  key={pkg.id}
                  style={{
                    position: 'relative',
                    background: isPopular 
                      ? 'linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(88, 101, 242, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                    borderRadius: '20px',
                    padding: '28px',
                    border: isPopular ? '2px solid rgba(88, 101, 242, 0.5)' : '2px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    boxShadow: isPopular 
                      ? '0 8px 32px rgba(88, 101, 242, 0.3), inset 0 0 60px rgba(88, 101, 242, 0.1)'
                      : '0 4px 20px rgba(0, 0, 0, 0.3)',
                    transform: 'translateY(0)',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = isPopular 
                      ? '0 12px 48px rgba(88, 101, 242, 0.4), inset 0 0 80px rgba(88, 101, 242, 0.15)'
                      : '0 8px 32px rgba(255, 215, 0, 0.2)';
                    e.currentTarget.style.border = isPopular 
                      ? '2px solid rgba(88, 101, 242, 0.8)'
                      : '2px solid rgba(255, 215, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = isPopular 
                      ? '0 8px 32px rgba(88, 101, 242, 0.3), inset 0 0 60px rgba(88, 101, 242, 0.1)'
                      : '0 4px 20px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.border = isPopular 
                      ? '2px solid rgba(88, 101, 242, 0.5)'
                      : '2px solid rgba(255, 255, 255, 0.1)';
                  }}
                >
                  {/* Animated Background Effect */}
                  {isPopular && (
                    <div style={{
                      position: 'absolute',
                      top: '-50%',
                      left: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'radial-gradient(circle, rgba(88, 101, 242, 0.1) 0%, transparent 70%)',
                      animation: 'rotate 8s linear infinite',
                      pointerEvents: 'none'
                    }} />
                  )}

                  {/* Popular Badge */}
                  {isPopular && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(88, 101, 242, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      animation: 'pulse 2s ease-in-out infinite'
                    }}>
                      <FaStar style={{ fontSize: '12px' }} />
                      EN POPÜLER
                    </div>
                  )}

                  {/* Icon */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    marginTop: isPopular ? '12px' : '0',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isPopular 
                        ? 'linear-gradient(135deg, rgba(88, 101, 242, 0.3) 0%, rgba(88, 101, 242, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.05) 100%)',
                      boxShadow: isPopular 
                        ? '0 0 40px rgba(88, 101, 242, 0.3), inset 0 0 20px rgba(88, 101, 242, 0.2)'
                        : '0 0 30px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.1)',
                      border: `2px solid ${isPopular ? 'rgba(88, 101, 242, 0.3)' : 'rgba(255, 215, 0, 0.2)'}`
                    }}>
                      <Icon style={{
                        fontSize: '48px',
                        color: isPopular ? '#5865f2' : '#ffd700',
                        filter: `drop-shadow(0 0 15px ${isPopular ? 'rgba(88, 101, 242, 0.5)' : 'rgba(255, 215, 0, 0.5)'})`
                      }} />
                    </div>
                  </div>

                  {/* Package Name */}
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: '16px',
                    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {pkg.name}
                  </h3>

                  {/* Coin Amount */}
                  <div style={{ textAlign: 'center', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                    <div style={{
                      fontSize: '42px',
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                      marginBottom: '8px'
                    }}>
                      {pkg.coins.toLocaleString()}
                    </div>
                    {pkg.bonus && (
                      <>
                        <div style={{
                          fontSize: '16px',
                          color: '#57f287',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          marginTop: '8px',
                          textShadow: '0 0 10px rgba(87, 242, 135, 0.3)'
                        }}>
                          <GiSparkles style={{ fontSize: '18px' }} />
                          +{pkg.bonus.toLocaleString()} Bonus!
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: '#b9bbbe',
                          marginTop: '6px'
                        }}>
                          Toplam: {totalCoins.toLocaleString()} coin
                        </div>
                      </>
                    )}
                  </div>

                  {/* Price */}
                  <div style={{ textAlign: 'center', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                    <div style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      color: 'white',
                      textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)'
                    }}>
                      {pkg.price.toFixed(2)} {pkg.currency}
                    </div>
                  </div>

                  {/* Buy Button */}
                  <button
                    onClick={() => handlePurchase(pkg)}
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: 'white',
                      background: isPopular 
                        ? 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)'
                        : 'linear-gradient(135deg, #57f287 0%, #3ba55d 100%)',
                      border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      boxShadow: isPopular 
                        ? '0 6px 20px rgba(88, 101, 242, 0.4)'
                        : '0 6px 20px rgba(87, 242, 135, 0.3)',
                      opacity: loading ? 0.6 : 1,
                      position: 'relative',
                      zIndex: 1,
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = isPopular 
                          ? '0 8px 28px rgba(88, 101, 242, 0.6)'
                          : '0 8px 28px rgba(87, 242, 135, 0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = isPopular 
                        ? '0 6px 20px rgba(88, 101, 242, 0.4)'
                        : '0 6px 20px rgba(87, 242, 135, 0.3)';
                    }}
                  >
                    {isLoading ? (
                      <>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          border: '3px solid rgba(255, 255, 255, 0.3)',
                          borderTop: '3px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }} />
                        İşleniyor...
                      </>
                    ) : (
                      <>
                        <FaCheck style={{ fontSize: '18px' }} />
                        Satın Al
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Info Box */}
          <div style={{
            marginTop: '32px',
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#dcddde',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#57f287', fontSize: '16px' }}>✓</span>
                <span>Coin'ler hesabınıza anında eklenir</span>
              </p>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#57f287', fontSize: '16px' }}>✓</span>
                <span>Güvenli ödeme Stripe ile korunuyor</span>
              </p>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#57f287', fontSize: '16px' }}>✓</span>
                <span>Bonus coin'ler belirli paketlere dahildir</span>
              </p>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: '#faa61a', fontSize: '16px' }}>⚠</span>
                <span style={{ color: '#b9bbbe', fontSize: '12px' }}>Test modunda çalışıyor - gerçek ödeme alınmıyor</span>
              </p>
            </div>
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { 
import { getApiBase } from '../utils/apiEndpoints';
              opacity: 0;
              transform: translateY(20px);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes pulse {
            0%, 100% { transform: translateX(-50%) scale(1); }
            50% { transform: translateX(-50%) scale(1.05); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes rotate {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default CoinStoreModal;

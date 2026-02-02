import React, { useState, useEffect } from 'react';
import './PaymentMethodsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const PaymentMethodsPanel = ({ onClose }) => {
  const apiBaseUrl = getApiBase();

  const [activeTab, setActiveTab] = useState('cards'); // cards, crypto, history, settings
  const [loading, setLoading] = useState(false);

  // Card Payments State
  const [cards, setCards] = useState([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    card_number: '',
    card_holder: '',
    expiry_month: '',
    expiry_year: '',
    cvv: '',
    is_default: false
  });

  // Crypto Payments State
  const [cryptoWallets, setCryptoWallets] = useState([]);
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState('btc');
  const [walletAddress, setWalletAddress] = useState('');

  // Payment History
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [historyFilter, setHistoryFilter] = useState('all'); // all, card, crypto

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    auto_renew: true,
    send_receipts: true,
    preferred_currency: 'USD',
    preferred_method: 'card',
    enable_crypto: true
  });

  const cryptoCurrencies = [
    { code: 'btc', name: 'Bitcoin', icon: '₿', color: '#f7931a' },
    { code: 'eth', name: 'Ethereum', icon: 'Ξ', color: '#627eea' },
    { code: 'usdt', name: 'Tether USDT', icon: '₮', color: '#26a17b' },
    { code: 'bnb', name: 'Binance Coin', icon: 'BNB', color: '#f3ba2f' },
    { code: 'usdc', name: 'USD Coin', icon: '$', color: '#2775ca' },
    { code: 'xrp', name: 'Ripple', icon: 'XRP', color: '#23292f' },
    { code: 'ada', name: 'Cardano', icon: 'ADA', color: '#0033ad' },
    { code: 'sol', name: 'Solana', icon: 'SOL', color: '#14f195' }
  ];

  const cardBrands = {
    visa: { name: 'Visa', color: '#1a1f71', icon: '💳' },
    mastercard: { name: 'Mastercard', color: '#eb001b', icon: '💳' },
    amex: { name: 'American Express', color: '#006fcf', icon: '💳' },
    discover: { name: 'Discover', color: '#ff6000', icon: '💳' }
  };

  useEffect(() => {
    if (activeTab === 'cards') fetchCards();
    if (activeTab === 'crypto') fetchCryptoWallets();
    if (activeTab === 'history') fetchPaymentHistory();
    if (activeTab === 'settings') fetchPaymentSettings();
  }, [activeTab]);

  // Endpoint 1: GET /api/payments/cards/ - Fetch saved cards
  const fetchCards = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/payments/cards/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCards(data.cards || []);
      } else {
        toast.error('❌ Kartlar yüklenemedi');
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
      toast.error('❌ Bağlantı hatası');
    } finally {
      setLoading(false);
    }
  };

  // Endpoint 2: POST /api/payments/cards/add/ - Add new card
  const addCard = async () => {
    if (!newCard.card_number || !newCard.card_holder || !newCard.expiry_month || !newCard.expiry_year || !newCard.cvv) {
      toast.warning('⚠️ Tüm alanları doldurun');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/payments/cards/add/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCard)
      });

      if (response.ok) {
        toast.success('✅ Kart eklendi');
        setShowAddCard(false);
        setNewCard({
          card_number: '',
          card_holder: '',
          expiry_month: '',
          expiry_year: '',
          cvv: '',
          is_default: false
        });
        fetchCards();
      } else {
        toast.error('❌ Kart eklenemedi');
      }
    } catch (error) {
      console.error('Error adding card:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const removeCard = async (cardId) => {
    if (!window.confirm('Bu kartı silmek istediğinize emin misiniz?')) return;

    try {
      const response = await fetch(`${apiBaseUrl}/payments/cards/${cardId}/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        toast.success('✅ Kart silindi');
        fetchCards();
      } else {
        toast.error('❌ Kart silinemedi');
      }
    } catch (error) {
      console.error('Error removing card:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  // Endpoint 3: GET /api/payments/crypto/wallets/ - Fetch crypto wallets
  const fetchCryptoWallets = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/payments/crypto/wallets/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCryptoWallets(data.wallets || []);
      } else {
        toast.error('❌ Cüzdanlar yüklenemedi');
      }
    } catch (error) {
      console.error('Error fetching wallets:', error);
      toast.error('❌ Bağlantı hatası');
    } finally {
      setLoading(false);
    }
  };

  // POST /api/payments/crypto/wallets/add/ - Add crypto wallet
  const addCryptoWallet = async () => {
    if (!walletAddress.trim()) {
      toast.warning('⚠️ Cüzdan adresi girin');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/payments/crypto/wallets/add/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currency: selectedCrypto,
          wallet_address: walletAddress
        })
      });

      if (response.ok) {
        toast.success('✅ Cüzdan eklendi');
        setShowAddWallet(false);
        setWalletAddress('');
        fetchCryptoWallets();
      } else {
        toast.error('❌ Cüzdan eklenemedi');
      }
    } catch (error) {
      console.error('Error adding wallet:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  // Endpoint 4: GET /api/payments/history/ - Fetch payment history
  const fetchPaymentHistory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/payments/history/?filter=${historyFilter}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPaymentHistory(data.payments || []);
      } else {
        toast.error('❌ Geçmiş yüklenemedi');
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      toast.error('❌ Bağlantı hatası');
    } finally {
      setLoading(false);
    }
  };

  // GET/POST /api/payments/settings/ - Fetch/update payment settings
  const fetchPaymentSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/payments/settings/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPaymentSettings(data.settings || paymentSettings);
      } else {
        toast.error('❌ Ayarlar yüklenemedi');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('❌ Bağlantı hatası');
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentSettings = async (newSettings) => {
    try {
      const response = await fetch(`${apiBaseUrl}/payments/settings/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSettings)
      });

      if (response.ok) {
        setPaymentSettings(newSettings);
        toast.success('✅ Ayarlar kaydedildi');
      } else {
        toast.error('❌ Ayarlar kaydedilemedi');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const maskCardNumber = (number) => {
    return `**** **** **** ${number.slice(-4)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: 'Tamamlandı', color: '#10b981' },
      pending: { text: 'Bekliyor', color: '#f59e0b' },
      failed: { text: 'Başarısız', color: '#ef4444' },
      refunded: { text: 'İade Edildi', color: '#6366f1' }
    };
    return badges[status] || badges.completed;
  };

  return (
    <div className="payment-methods-overlay" onClick={onClose}>
      <div className="payment-methods-panel" onClick={(e) => e.stopPropagation()}>
        <div className="payment-methods-header">
          <h2>💳 Ödeme Yöntemleri</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="payment-methods-tabs">
          <button
            className={`tab-btn ${activeTab === 'cards' ? 'active' : ''}`}
            onClick={() => setActiveTab('cards')}
          >
            💳 Kartlarım
          </button>
          <button
            className={`tab-btn ${activeTab === 'crypto' ? 'active' : ''}`}
            onClick={() => setActiveTab('crypto')}
          >
            ₿ Kripto
          </button>
          <button
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            📜 Geçmiş
          </button>
          <button
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Ayarlar
          </button>
        </div>

        <div className="payment-methods-content">
          {/* CARDS TAB */}
          {activeTab === 'cards' && (
            <div className="cards-section">
              <div className="section-header">
                <h3>Kayıtlı Kartlarım</h3>
                <button className="add-btn" onClick={() => setShowAddCard(true)}>
                  + Kart Ekle
                </button>
              </div>

              {loading ? (
                <div className="loading-spinner">Yükleniyor...</div>
              ) : cards.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">💳</span>
                  <p>Henüz kayıtlı kartınız yok</p>
                  <button className="empty-action-btn" onClick={() => setShowAddCard(true)}>
                    İlk Kartınızı Ekleyin
                  </button>
                </div>
              ) : (
                <div className="cards-grid">
                  {cards.map((card) => (
                    <div key={card.id} className={`card-item ${card.is_default ? 'default' : ''}`}>
                      {card.is_default && <span className="default-badge">Varsayılan</span>}
                      <div className="card-brand">{cardBrands[card.brand]?.icon || '💳'} {cardBrands[card.brand]?.name || card.brand}</div>
                      <div className="card-number">{maskCardNumber(card.card_number)}</div>
                      <div className="card-holder">{card.card_holder}</div>
                      <div className="card-expiry">Son Kullanma: {card.expiry_month}/{card.expiry_year}</div>
                      <div className="card-actions">
                        <button className="remove-btn" onClick={() => removeCard(card.id)}>🗑️ Kaldır</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAddCard && (
                <div className="modal-overlay" onClick={() => setShowAddCard(false)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h3>Yeni Kart Ekle</h3>
                    <div className="form-group">
                      <label>Kart Numarası</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength="16"
                        value={newCard.card_number}
                        onChange={(e) => setNewCard({ ...newCard, card_number: e.target.value.replace(/\s/g, '') })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Kart Sahibi</label>
                      <input
                        type="text"
                        placeholder="AD SOYAD"
                        value={newCard.card_holder}
                        onChange={(e) => setNewCard({ ...newCard, card_holder: e.target.value.toUpperCase() })}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Ay</label>
                        <input
                          type="text"
                          placeholder="MM"
                          maxLength="2"
                          value={newCard.expiry_month}
                          onChange={(e) => setNewCard({ ...newCard, expiry_month: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Yıl</label>
                        <input
                          type="text"
                          placeholder="YY"
                          maxLength="2"
                          value={newCard.expiry_year}
                          onChange={(e) => setNewCard({ ...newCard, expiry_year: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          maxLength="3"
                          value={newCard.cvv}
                          onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-group checkbox-group">
                      <input
                        type="checkbox"
                        id="default-card"
                        checked={newCard.is_default}
                        onChange={(e) => setNewCard({ ...newCard, is_default: e.target.checked })}
                      />
                      <label htmlFor="default-card">Varsayılan kart olarak ayarla</label>
                    </div>
                    <div className="modal-actions">
                      <button className="cancel-btn" onClick={() => setShowAddCard(false)}>İptal</button>
                      <button className="save-btn" onClick={addCard}>Kaydet</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CRYPTO TAB */}
          {activeTab === 'crypto' && (
            <div className="crypto-section">
              <div className="section-header">
                <h3>Kripto Cüzdanlarım</h3>
                <button className="add-btn" onClick={() => setShowAddWallet(true)}>
                  + Cüzdan Ekle
                </button>
              </div>

              {loading ? (
                <div className="loading-spinner">Yükleniyor...</div>
              ) : cryptoWallets.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">₿</span>
                  <p>Henüz kripto cüzdanınız yok</p>
                  <button className="empty-action-btn" onClick={() => setShowAddWallet(true)}>
                    İlk Cüzdanınızı Ekleyin
                  </button>
                </div>
              ) : (
                <div className="wallets-list">
                  {cryptoWallets.map((wallet) => {
                    const crypto = cryptoCurrencies.find(c => c.code === wallet.currency);
                    return (
                      <div key={wallet.id} className="wallet-item" style={{ borderLeftColor: crypto?.color }}>
                        <div className="wallet-header">
                          <span className="crypto-icon" style={{ color: crypto?.color }}>
                            {crypto?.icon}
                          </span>
                          <div className="wallet-info">
                            <div className="crypto-name">{crypto?.name}</div>
                            <div className="wallet-address">{wallet.wallet_address}</div>
                          </div>
                        </div>
                        <button className="copy-btn" onClick={() => {
                          navigator.clipboard.writeText(wallet.wallet_address);
                          toast.success('✅ Adres kopyalandı');
                        }}>
                          📋 Kopyala
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {showAddWallet && (
                <div className="modal-overlay" onClick={() => setShowAddWallet(false)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h3>Kripto Cüzdan Ekle</h3>
                    <div className="form-group">
                      <label>Kripto Para Seçin</label>
                      <div className="crypto-grid">
                        {cryptoCurrencies.map((crypto) => (
                          <button
                            key={crypto.code}
                            className={`crypto-option ${selectedCrypto === crypto.code ? 'selected' : ''}`}
                            style={{ borderColor: selectedCrypto === crypto.code ? crypto.color : 'transparent' }}
                            onClick={() => setSelectedCrypto(crypto.code)}
                          >
                            <span style={{ color: crypto.color }}>{crypto.icon}</span>
                            <span className="crypto-name">{crypto.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Cüzdan Adresi</label>
                      <input
                        type="text"
                        placeholder="0x..."
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                      />
                    </div>
                    <div className="modal-actions">
                      <button className="cancel-btn" onClick={() => setShowAddWallet(false)}>İptal</button>
                      <button className="save-btn" onClick={addCryptoWallet}>Kaydet</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div className="history-section">
              <div className="section-header">
                <h3>Ödeme Geçmişi</h3>
                <div className="history-filters">
                  <button
                    className={`filter-btn ${historyFilter === 'all' ? 'active' : ''}`}
                    onClick={() => { setHistoryFilter('all'); fetchPaymentHistory(); }}
                  >
                    Tümü
                  </button>
                  <button
                    className={`filter-btn ${historyFilter === 'card' ? 'active' : ''}`}
                    onClick={() => { setHistoryFilter('card'); fetchPaymentHistory(); }}
                  >
                    Kart
                  </button>
                  <button
                    className={`filter-btn ${historyFilter === 'crypto' ? 'active' : ''}`}
                    onClick={() => { setHistoryFilter('crypto'); fetchPaymentHistory(); }}
                  >
                    Kripto
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="loading-spinner">Yükleniyor...</div>
              ) : paymentHistory.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon">📜</span>
                  <p>Henüz ödeme geçmişiniz yok</p>
                </div>
              ) : (
                <div className="history-list">
                  {paymentHistory.map((payment) => {
                    const statusBadge = getStatusBadge(payment.status);
                    return (
                      <div key={payment.id} className="payment-item">
                        <div className="payment-icon">
                          {payment.method === 'card' ? '💳' : '₿'}
                        </div>
                        <div className="payment-details">
                          <div className="payment-description">{payment.description}</div>
                          <div className="payment-date">{formatDate(payment.created_at)}</div>
                        </div>
                        <div className="payment-amount">${payment.amount}</div>
                        <span className="payment-status" style={{ backgroundColor: statusBadge.color }}>
                          {statusBadge.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="settings-section">
              <h3>Ödeme Ayarları</h3>

              <div className="setting-group">
                <div className="setting-item">
                  <div className="setting-label">
                    <span>Otomatik Yenileme</span>
                    <small>Abonelikler otomatik yenilensin</small>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={paymentSettings.auto_renew}
                      onChange={(e) => updatePaymentSettings({ ...paymentSettings, auto_renew: e.target.checked })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-label">
                    <span>Fatura E-postası</span>
                    <small>Ödeme sonrası e-posta gönder</small>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={paymentSettings.send_receipts}
                      onChange={(e) => updatePaymentSettings({ ...paymentSettings, send_receipts: e.target.checked })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-label">
                    <span>Kripto Ödemeleri</span>
                    <small>Kripto para ile ödeme kabul et</small>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={paymentSettings.enable_crypto}
                      onChange={(e) => updatePaymentSettings({ ...paymentSettings, enable_crypto: e.target.checked })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="setting-group">
                <div className="setting-item">
                  <label>Tercih Edilen Para Birimi</label>
                  <select
                    value={paymentSettings.preferred_currency}
                    onChange={(e) => updatePaymentSettings({ ...paymentSettings, preferred_currency: e.target.value })}
                  >
                    <option value="USD">USD - Dolar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="TRY">TRY - Türk Lirası</option>
                    <option value="GBP">GBP - İngiliz Sterlini</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label>Tercih Edilen Ödeme Yöntemi</label>
                  <select
                    value={paymentSettings.preferred_method}
                    onChange={(e) => updatePaymentSettings({ ...paymentSettings, preferred_method: e.target.value })}
                  >
                    <option value="card">Kredi/Banka Kartı</option>
                    <option value="crypto">Kripto Para</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPanel;


import React, { useState, useEffect } from 'react';
import './QuotesPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const QuotesPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [quotes, setQuotes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newQuote, setNewQuote] = useState({
    content: '',
    author: '',
    category: 'motivational'
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const categories = [
    { value: 'motivational', label: 'Motivasyon', icon: '💪' },
    { value: 'funny', label: 'Komik', icon: '😂' },
    { value: 'wisdom', label: 'Hikmet', icon: '🧠' },
    { value: 'love', label: 'Aşk', icon: '❤️' },
    { value: 'success', label: 'Başarı', icon: '🏆' },
    { value: 'life', label: 'Hayat', icon: '🌟' }
  ];

  useEffect(() => {
    fetchQuotes();
  }, [serverId]);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/quotes/server/${serverId}/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createQuote = async () => {
    if (!newQuote.content) {
      toast.error('❌ Alıntı içeriği gerekli');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/quotes/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ server_id: serverId, ...newQuote })
      });

      if (response.ok) {
        toast.success('✅ Alıntı eklendi');
        setShowCreateModal(false);
        fetchQuotes();
        setNewQuote({ content: '', author: '', category: 'motivational' });
      } else {
        toast.error('❌ Ekleme hatası');
      }
    } catch (error) {
      toast.error('❌ Bağlantı hatası');
    }
  };

  const deleteQuote = async (id) => {
    if (!await confirmDialog('Alıntıyı silmek istediğinize emin misiniz?')) return;
    try {
      const response = await fetch(`${apiBaseUrl}/quotes/${id}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        toast.success('✅ Alıntı silindi');
        fetchQuotes();
      }
    } catch (error) {
      toast.error('❌ Silme hatası');
    }
  };

  const sendRandom = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/quotes/server/${serverId}/random/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        toast.success('✅ Rastgele alıntı gönderildi');
      }
    } catch (error) {
      toast.error('❌ Gönderim hatası');
    }
  };

  const getCategoryData = (category) => {
    return categories.find(c => c.value === category) || categories[0];
  };

  const filteredQuotes = quotes.filter(q => 
    filter === 'all' || q.category === filter
  );

  return (
    <div className="quotes-overlay" onClick={onClose}>
      <div className="quotes-panel" onClick={(e) => e.stopPropagation()}>
        <div className="quotes-header">
          <h2>💬 Alıntılar</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="quotes-content">
          <div className="quotes-toolbar">
            <button className="create-quote-btn" onClick={() => setShowCreateModal(true)}>
              + Yeni Alıntı
            </button>
            <button className="random-btn" onClick={sendRandom}>
              🎲 Rastgele Gönder
            </button>
          </div>

          <div className="category-filters">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
              🌐 Tümü ({quotes.length})
            </button>
            {categories.map(cat => (
              <button 
                key={cat.value} 
                className={filter === cat.value ? 'active' : ''}
                onClick={() => setFilter(cat.value)}
              >
                {cat.icon} {cat.label} ({quotes.filter(q => q.category === cat.value).length})
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Yükleniyor...</p>
            </div>
          ) : filteredQuotes.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">💬</span>
              <p>Henüz alıntı yok</p>
            </div>
          ) : (
            <div className="quotes-list">
              {filteredQuotes.map((quote) => {
                const catData = getCategoryData(quote.category);
                return (
                  <div key={quote.id} className="quote-card">
                    <div className="quote-category">
                      <span className="category-badge" style={{background: getCategoryColor(quote.category)}}>
                        {catData.icon} {catData.label}
                      </span>
                    </div>
                    <div className="quote-content">
                      <p>"{quote.content}"</p>
                      {quote.author && <span className="quote-author">— {quote.author}</span>}
                    </div>
                    <div className="quote-footer">
                      <span className="quote-uses">👁️ {quote.uses || 0} kez kullanıldı</span>
                      <button className="delete-btn" onClick={() => deleteQuote(quote.id)}>🗑️</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {showCreateModal && (
          <div className="create-modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="create-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Yeni Alıntı</h3>
                <button className="close-btn" onClick={() => setShowCreateModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>İçerik *</label>
                  <textarea value={newQuote.content} onChange={(e) => setNewQuote({...newQuote, content: e.target.value})} rows="4" placeholder="Alıntı içeriği..." />
                </div>
                <div className="form-group">
                  <label>Yazar</label>
                  <input value={newQuote.author} onChange={(e) => setNewQuote({...newQuote, author: e.target.value})} placeholder="Opsiyonel" />
                </div>
                <div className="form-group">
                  <label>Kategori</label>
                  <select value={newQuote.category} onChange={(e) => setNewQuote({...newQuote, category: e.target.value})}>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.icon} {cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="cancel-btn" onClick={() => setShowCreateModal(false)}>İptal</button>
                <button className="submit-btn" onClick={createQuote}>💬 Ekle</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getCategoryColor = (category) => {
  const colors = {
    motivational: '#3b82f6',
    funny: '#fbbf24',
    wisdom: '#8b5cf6',
    love: '#ec4899',
    success: '#22c55e',
    life: '#f59e0b'
  };
  return colors[category] || colors.motivational;
};

export default QuotesPanel;


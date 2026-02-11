import { useState, useEffect } from 'react';
import './HighlightsPanel.css';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import { api } from '../services/ApiService';  // 🚀 Centralized API service
import confirmDialog from '../utils/confirmDialog';

const HighlightsPanel = ({ serverId, onClose }) => {
  const [config, setConfig] = useState({
    enabled: false,
    keywords: [],
    dm_notifications: true,
    highlight_color: '#fbbf24'
  });
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    fetchConfig();
    fetchHighlights();
  }, [serverId]);

  const fetchConfig = async () => {
    try {
      // 🚀 Using centralized ApiService instead of direct fetch
      const data = await api.get(`/highlights/server/${serverId}/config/`);
      setConfig(data);
    } catch (error) {
      console.error('Fetch config error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHighlights = async () => {
    try {
      // 🚀 Using centralized ApiService
      const data = await api.get(`/highlights/server/${serverId}/messages/`);
      setHighlights(data);
    } catch (error) {
      console.error('Fetch highlights error:', error);
    }
  };

  const saveConfig = async () => {
    try {
      // 🚀 Using centralized ApiService
      await api.post(`/highlights/server/${serverId}/config/`, config);
      toast.success('✅ Highlight ayarları kaydedildi');
    } catch (error) {
      console.error('Save config error:', error);
      toast.error('❌ Kaydetme hatası');
    }
  };

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    if (config.keywords.includes(newKeyword.toLowerCase())) {
      toast.warning('⚠️ Bu kelime zaten ekli');
      return;
    }
    setConfig({ ...config, keywords: [...config.keywords, newKeyword.toLowerCase()] });
    setNewKeyword('');
  };

  const removeKeyword = (keyword) => {
    setConfig({ ...config, keywords: config.keywords.filter(k => k !== keyword) });
  };

  const clearHighlights = async () => {
    if (!await confirmDialog('Tüm highlight geçmişini temizlemek istediğinize emin misiniz?')) return;
    try {
      const response = await fetch(`${apiBaseUrl}/highlights/server/${serverId}/clear/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        toast.success('✅ Geçmiş temizlendi');
        setHighlights([]);
      }
    } catch (error) {
      toast.error('❌ Temizleme hatası');
    }
  };

  return (
    <div className="highlights-overlay" onClick={onClose}>
      <div className="highlights-panel" onClick={(e) => e.stopPropagation()}>
        <div className="highlights-header">
          <h2>✨ Highlight Sistemi</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="highlights-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Yükleniyor...</p>
            </div>
          ) : (
            <>
              <div className="config-section">
                <div className="section-header">
                  <h3>⚙️ Ayarlar</h3>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={config.enabled} onChange={(e) => setConfig({ ...config, enabled: e.target.checked })} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="keywords-section">
                  <h4>🔑 Anahtar Kelimeler</h4>
                  <div className="keyword-input">
                    <input
                      type="text"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                      placeholder="Kelime ekle..."
                    />
                    <button onClick={addKeyword}>➕</button>
                  </div>
                  {config.keywords.length > 0 && (
                    <div className="keywords-list">
                      {config.keywords.map((keyword, idx) => (
                        <div key={idx} className="keyword-tag">
                          <span>{keyword}</span>
                          <button onClick={() => removeKeyword(keyword)}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="config-options">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={config.dm_notifications} onChange={(e) => setConfig({ ...config, dm_notifications: e.target.checked })} />
                      <span>DM bildirimleri gönder</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label>Highlight Rengi</label>
                    <input type="color" value={config.highlight_color} onChange={(e) => setConfig({ ...config, highlight_color: e.target.value })} />
                  </div>
                </div>

                <button className="save-btn" onClick={saveConfig}>💾 Kaydet</button>
              </div>

              <div className="highlights-section">
                <div className="section-header">
                  <h3>📝 Highlight Geçmişi ({highlights.length})</h3>
                  {highlights.length > 0 && (
                    <button className="clear-btn" onClick={clearHighlights}>🗑️ Temizle</button>
                  )}
                </div>

                {highlights.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">✨</span>
                    <p>Henüz highlight yok</p>
                  </div>
                ) : (
                  <div className="highlights-list">
                    {highlights.map((hl) => (
                      <div key={hl.id} className="highlight-card">
                        <div className="highlight-header">
                          <div className="highlight-author">
                            {hl.author_avatar ? <img src={hl.author_avatar} alt="" /> : <div className="default-avatar">👤</div>}
                            <div className="author-info">
                              <span className="author-name">{hl.author_name}</span>
                              <span className="channel-name"># {hl.channel_name}</span>
                            </div>
                          </div>
                          <span className="highlight-time">{new Date(hl.created_at).toLocaleString('tr-TR')}</span>
                        </div>
                        <div className="highlight-content">
                          <p dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(hl.content.replace(
                              new RegExp(`(${config.keywords.join('|')})`, 'gi'),
                              `<mark style="background: ${config.highlight_color}; color: #000; padding: 2px 4px; border-radius: 4px;">$1</mark>`
                            ))
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighlightsPanel;


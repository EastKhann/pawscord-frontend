import { useState, useEffect } from 'react';
import './TranslationPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const TranslationPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [config, setConfig] = useState({
    enabled: false,
    auto_translate: false,
    default_language: 'tr',
    allowed_languages: ['en', 'tr', 'de', 'fr', 'es'],
    react_to_translate: true,
    translation_emoji: '🌐'
  });
  const [stats, setStats] = useState({
    total_translations: 0,
    top_languages: [],
    translations_today: 0
  });
  const [loading, setLoading] = useState(true);

  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
  ];

  useEffect(() => {
    fetchConfig();
    fetchStats();
  }, [serverId]);

  const fetchConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/translation/server/${serverId}/config/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/translation/server/${serverId}/stats/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/translation/server/${serverId}/config/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        toast.success('✅ Çeviri ayarları kaydedildi');
      } else {
        toast.error('❌ Kaydetme hatası');
      }
    } catch (error) {
      toast.error('❌ Bağlantı hatası');
    }
  };

  const toggleLanguage = (code) => {
    const newAllowed = config.allowed_languages.includes(code)
      ? config.allowed_languages.filter(l => l !== code)
      : [...config.allowed_languages, code];
    setConfig({ ...config, allowed_languages: newAllowed });
  };

  return (
    <div className="translation-overlay" onClick={onClose}>
      <div className="translation-panel" onClick={(e) => e.stopPropagation()}>
        <div className="translation-header">
          <h2>🌐 Çeviri Sistemi</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="translation-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Yükleniyor...</p>
            </div>
          ) : (
            <>
              <div className="stats-section">
                <div className="stat-card">
                  <span className="stat-icon">🌐</span>
                  <div className="stat-info">
                    <h3>{stats.total_translations}</h3>
                    <p>Toplam Çeviri</p>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">📅</span>
                  <div className="stat-info">
                    <h3>{stats.translations_today}</h3>
                    <p>Bugün</p>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">🏆</span>
                  <div className="stat-info">
                    <h3>{stats.top_languages[0] || 'N/A'}</h3>
                    <p>En Popüler</p>
                  </div>
                </div>
              </div>

              <div className="config-section">
                <div className="section-header">
                  <h3>⚙️ Ayarlar</h3>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={config.enabled} onChange={(e) => setConfig({...config, enabled: e.target.checked})} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="config-grid">
                  <div className="form-group">
                    <label>🌍 Varsayılan Dil</label>
                    <select value={config.default_language} onChange={(e) => setConfig({...config, default_language: e.target.value})}>
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>🌐 Çeviri Emoji</label>
                    <input type="text" value={config.translation_emoji} onChange={(e) => setConfig({...config, translation_emoji: e.target.value})} />
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={config.auto_translate} onChange={(e) => setConfig({...config, auto_translate: e.target.checked})} />
                      <span>Otomatik çeviri</span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={config.react_to_translate} onChange={(e) => setConfig({...config, react_to_translate: e.target.checked})} />
                      <span>Emoji ile çevir</span>
                    </label>
                  </div>
                </div>

                <div className="languages-section">
                  <h4>İzin Verilen Diller</h4>
                  <div className="languages-grid">
                    {languages.map(lang => (
                      <div 
                        key={lang.code} 
                        className={`language-card ${config.allowed_languages.includes(lang.code) ? 'active' : ''}`}
                        onClick={() => toggleLanguage(lang.code)}
                      >
                        <span className="language-flag">{lang.flag}</span>
                        <span className="language-name">{lang.name}</span>
                        {config.allowed_languages.includes(lang.code) && <span className="check-icon">✅</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <button className="save-btn" onClick={saveConfig}>💾 Kaydet</button>
              </div>

              {stats.top_languages.length > 0 && (
                <div className="top-languages-section">
                  <h3>📊 En Çok Kullanılan Diller</h3>
                  <div className="top-languages-list">
                    {stats.top_languages.slice(0, 5).map((lang, idx) => {
                      const langData = languages.find(l => l.code === lang.code);
                      return (
                        <div key={idx} className="top-language-item">
                          <span className="rank">#{idx + 1}</span>
                          <span className="flag">{langData?.flag}</span>
                          <span className="name">{langData?.name}</span>
                          <span className="count">{lang.count} çeviri</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslationPanel;


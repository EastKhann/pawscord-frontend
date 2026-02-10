import React, { useState, useEffect } from 'react';
import './PrivacySettingsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const PrivacySettingsPanel = ({ onClose }) => {
  const [settings, setSettings] = useState({
    // DM Privacy
    allow_dm_from_everyone: true,
    allow_dm_from_friends_only: false,
    allow_dm_from_server_members: true,
    allow_friend_requests: true,
    
    // Server Privacy
    keep_dm_history_on_server_leave: true,
    show_current_activity: true,
    
    // Message Filtering
    explicit_content_filter: 'friends', // all, friends, none
    blocked_words_filter_enabled: false,
    
    // Visibility
    show_online_status: true,
    show_read_receipts: true,
    show_typing_indicator: true,
    allow_profile_views_from_non_friends: false,
    
    // Data Privacy
    allow_data_collection: false,
    allow_personalized_ads: false
  });

  const [blockedWords, setBlockedWords] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = getApiBase();

  useEffect(() => {
    fetchPrivacySettings();
    fetchBlockedWords();
  }, []);

  // Fetch privacy settings
  const fetchPrivacySettings = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/privacy/settings/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching privacy settings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch blocked words
  const fetchBlockedWords = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/privacy/blocked-words/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBlockedWords(data.blocked_words || []);
      }
    } catch (error) {
      console.error('Error fetching blocked words:', error);
    }
  };

  // Update privacy settings
  const updateSettings = async (newSettings) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/privacy/settings/update/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSettings)
      });

      if (response.ok) {
        setSettings(newSettings);
        toast.success('✅ Gizlilik ayarları kaydedildi');
      } else {
        toast.error('❌ Ayarlar kaydedilemedi');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  // Toggle setting
  const toggleSetting = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    updateSettings(newSettings);
  };

  // Update explicit content filter
  const updateExplicitFilter = (value) => {
    const newSettings = { ...settings, explicit_content_filter: value };
    updateSettings(newSettings);
  };

  // Add blocked word
  const addBlockedWord = async () => {
    if (!newWord.trim()) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/privacy/blocked-words/add/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ word: newWord.trim() })
      });

      if (response.ok) {
        setBlockedWords([...blockedWords, newWord.trim()]);
        setNewWord('');
        toast.success(`✅ "${newWord.trim()}" engellenmiş kelimeler listesine eklendi`);
      } else {
        toast.error('❌ Kelime eklenemedi');
      }
    } catch (error) {
      console.error('Error adding blocked word:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  // Remove blocked word
  const removeBlockedWord = async (word) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/privacy/blocked-words/remove/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ word })
      });

      if (response.ok) {
        setBlockedWords(blockedWords.filter(w => w !== word));
        toast.success(`✅ "${word}" engellenmiş kelimeler listesinden kaldırıldı`);
      } else {
        toast.error('❌ Kelime kaldırılamadı');
      }
    } catch (error) {
      console.error('Error removing blocked word:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  // Request data export
  const requestDataExport = async () => {
    if (!await confirmDialog('Verilerinizi dışa aktarmak istediğinizden emin misiniz? Bu işlem biraz zaman alabilir.')) {
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/privacy/data-export/request/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('✅ Veri dışa aktarma işlemi başlatıldı. E-postanıza link gönderilecek.');
      } else {
        toast.error('❌ İstek gönderilemedi');
      }
    } catch (error) {
      console.error('Error requesting data export:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  if (loading) {
    return (
      <div className="privacy-settings-overlay">
        <div className="privacy-settings-panel">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Gizlilik ayarları yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="privacy-settings-overlay" onClick={onClose}>
      <div className="privacy-settings-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="privacy-settings-header">
          <h2>🔒 Gizlilik ve Güvenlik Ayarları</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Content */}
        <div className="privacy-settings-content">
          {/* DM Privacy */}
          <div className="settings-section">
            <h3>💬 Direkt Mesaj Gizliliği</h3>
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Herkesten DM alabilir</div>
                  <div className="setting-desc">Sunucu üyesi olmasalar bile</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.allow_dm_from_everyone}
                    onChange={() => toggleSetting('allow_dm_from_everyone')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Sadece arkadaşlardan DM</div>
                  <div className="setting-desc">Yalnızca arkadaşlarınızdan mesaj alabilirsiniz</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.allow_dm_from_friends_only}
                    onChange={() => toggleSetting('allow_dm_from_friends_only')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Sunucu üyelerinden DM</div>
                  <div className="setting-desc">Aynı sunucudaki üyelerden mesaj alabilirsiniz</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.allow_dm_from_server_members}
                    onChange={() => toggleSetting('allow_dm_from_server_members')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Arkadaşlık isteklerini kabul et</div>
                  <div className="setting-desc">Diğer kullanıcılar size istek gönderebilir</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.allow_friend_requests}
                    onChange={() => toggleSetting('allow_friend_requests')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Server Privacy */}
          <div className="settings-section">
            <h3>🏠 Sunucu Gizliliği</h3>
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Sunucudan ayrılırken DM geçmişini sakla</div>
                  <div className="setting-desc">Sunucudan ayrıldıktan sonra DM'ler silinmez</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.keep_dm_history_on_server_leave}
                    onChange={() => toggleSetting('keep_dm_history_on_server_leave')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Mevcut aktiviteyi göster</div>
                  <div className="setting-desc">Oynadığınız oyun veya dinlediğiniz müziği gösterin</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.show_current_activity}
                    onChange={() => toggleSetting('show_current_activity')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Message Filtering */}
          <div className="settings-section">
            <h3>🛡️ Mesaj Filtreleme</h3>
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Açık içerik filtresi</div>
                  <div className="setting-desc">Mesajlardaki müstehcen içeriği otomatik tara</div>
                </div>
                <select
                  className="explicit-filter-select"
                  value={settings.explicit_content_filter}
                  onChange={(e) => updateExplicitFilter(e.target.value)}
                >
                  <option value="none">Kapalı</option>
                  <option value="friends">Arkadaşlar hariç</option>
                  <option value="all">Herkesten tara</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Engellenmiş kelime filtresi</div>
                  <div className="setting-desc">Belirlediğiniz kelimeleri içeren mesajları gizleyin</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.blocked_words_filter_enabled}
                    onChange={() => toggleSetting('blocked_words_filter_enabled')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            {settings.blocked_words_filter_enabled && (
              <div className="blocked-words-section">
                <h4>Engellenmiş Kelimeler</h4>
                <div className="add-word-form">
                  <input
                    type="text"
                    placeholder="Engellenecek kelime..."
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addBlockedWord()}
                  />
                  <button className="add-word-btn" onClick={addBlockedWord}>
                    ➕ Ekle
                  </button>
                </div>

                {blockedWords.length > 0 ? (
                  <div className="blocked-words-list">
                    {blockedWords.map((word, index) => (
                      <div key={index} className="blocked-word-item">
                        <span>{word}</span>
                        <button
                          className="remove-word-btn"
                          onClick={() => removeBlockedWord(word)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-state">Henüz engellenmiş kelime yok</p>
                )}
              </div>
            )}
          </div>

          {/* Visibility */}
          <div className="settings-section">
            <h3>👁️ Görünürlük</h3>
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Çevrimiçi durumu göster</div>
                  <div className="setting-desc">Diğer kullanıcılar çevrimiçi olduğunuzu görebilir</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.show_online_status}
                    onChange={() => toggleSetting('show_online_status')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Okundu bilgisi gönder</div>
                  <div className="setting-desc">Mesajları okuduğunuzda karşı tarafa bildirim gösterilir</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.show_read_receipts}
                    onChange={() => toggleSetting('show_read_receipts')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Yazıyor göstergesini göster</div>
                  <div className="setting-desc">Mesaj yazarken karşı tarafa bildirim gösterilir</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.show_typing_indicator}
                    onChange={() => toggleSetting('show_typing_indicator')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Arkadaş olmayanlar profilimi görebilir</div>
                  <div className="setting-desc">Herkes profilinizi görüntüleyebilir</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.allow_profile_views_from_non_friends}
                    onChange={() => toggleSetting('allow_profile_views_from_non_friends')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Data Privacy */}
          <div className="settings-section">
            <h3>📊 Veri Gizliliği</h3>
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Veri toplamaya izin ver</div>
                  <div className="setting-desc">Uygulamayı geliştirmek için anonim kullanım verisi toplanır</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.allow_data_collection}
                    onChange={() => toggleSetting('allow_data_collection')}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-label">Kişiselleştirilmiş reklamlara izin ver</div>
                  <div className="setting-desc">Size özel reklamlar gösterilir</div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.allow_personalized_ads}
                    onChange={() => toggleSetting('allow_personalized_ads')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <button className="export-data-btn" onClick={requestDataExport}>
              📥 Verilerimi Dışa Aktar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsPanel;


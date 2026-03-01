import { useState, useEffect, useCallback, memo } from 'react';
import './CustomEmbedPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const CustomEmbedPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [embeds, setEmbeds] = useState([]);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [currentEmbed, setCurrentEmbed] = useState({
    title: '',
    description: '',
    color: '#5865f2',
    thumbnail: '',
    image: '',
    author_name: '',
    author_icon: '',
    footer_text: '',
    footer_icon: '',
    fields: []
  });
  const [selectedChannel, setSelectedChannel] = useState('');

  useEffect(() => {
    fetchEmbeds();
    fetchChannels();
  }, [serverId]);

  const fetchEmbeds = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/custom-embeds/server/${serverId}/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setEmbeds(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChannels = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setChannels(data.filter(ch => ch.type === 'text'));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveEmbed = async () => {
    if (!currentEmbed.title && !currentEmbed.description) {
      toast.error('❌ En az başlık veya açıklama gerekli');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/custom-embeds/save/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ server_id: serverId, ...currentEmbed })
      });

      if (response.ok) {
        toast.success('✅ Embed kaydedildi');
        setShowEditor(false);
        fetchEmbeds();
        resetEmbed();
      } else {
        toast.error('❌ Kaydetme hatası');
      }
    } catch (error) {
      toast.error('❌ Bağlantı hatası');
    }
  };

  const sendEmbed = async (embedId) => {
    if (!selectedChannel) {
      toast.error('❌ Lütfen bir kanal seçin');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/custom-embeds/${embedId}/send/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ channel_id: selectedChannel })
      });

      if (response.ok) {
        toast.success('✅ Embed gönderildi');
      } else {
        toast.error('❌ Gönderim hatası');
      }
    } catch (error) {
      toast.error('❌ Bağlantı hatası');
    }
  };

  const deleteEmbed = async (id) => {
    if (!await confirmDialog('Embed\'i silmek istediğinize emin misiniz?')) return;
    try {
      const response = await fetch(`${apiBaseUrl}/custom-embeds/${id}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        toast.success('✅ Embed silindi');
        fetchEmbeds();
      }
    } catch (error) {
      toast.error('❌ Silme hatası');
    }
  };

  const addField = () => {
    setCurrentEmbed({
      ...currentEmbed,
      fields: [...currentEmbed.fields, { name: '', value: '', inline: false }]
    });
  };

  const updateField = (index, key, value) => {
    const newFields = [...currentEmbed.fields];
    newFields[index][key] = value;
    setCurrentEmbed({ ...currentEmbed, fields: newFields });
  };

  const removeField = (index) => {
    setCurrentEmbed({
      ...currentEmbed,
      fields: currentEmbed.fields.filter((_, i) => i !== index)
    });
  };

  const resetEmbed = () => {
    setCurrentEmbed({
      title: '', description: '', color: '#5865f2', thumbnail: '', image: '',
      author_name: '', author_icon: '', footer_text: '', footer_icon: '', fields: []
    });
  };

  // 🎯 Performance: Memoized event handlers
  const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
  const handleToggleEditor = useCallback(() => setShowEditor(prev => !prev), []);
  const handleChannelChange = useCallback((e) => setSelectedChannel(e.target.value), []);
  const handleAuthorNameChange = useCallback((e) => setCurrentEmbed(prev => ({ ...prev, author_name: e.target.value })), []);
  const handleAuthorIconChange = useCallback((e) => setCurrentEmbed(prev => ({ ...prev, author_icon: e.target.value })), []);
  const handleTitleChange = useCallback((e) => setCurrentEmbed(prev => ({ ...prev, title: e.target.value })), []);
  const handleDescriptionChange = useCallback((e) => setCurrentEmbed(prev => ({ ...prev, description: e.target.value })), []);
  const handleColorChange = useCallback((e) => setCurrentEmbed(prev => ({ ...prev, color: e.target.value })), []);
  const handleThumbnailChange = useCallback((e) => setCurrentEmbed(prev => ({ ...prev, thumbnail: e.target.value })), []);
  const handleImageChange = useCallback((e) => setCurrentEmbed(prev => ({ ...prev, image: e.target.value })), []);
  const handleFooterTextChange = useCallback((e) => setCurrentEmbed(prev => ({ ...prev, footer_text: e.target.value })), []);
  const handleFooterIconChange = useCallback((e) => setCurrentEmbed(prev => ({ ...prev, footer_icon: e.target.value })), []);

  return (
    <div className="custom-embed-overlay" onClick={onClose}>
      <div className="custom-embed-panel" onClick={handleStopPropagation}>
        <div className="custom-embed-header">
          <h2>📝 Özel Embed Oluşturucu</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="custom-embed-content">
          <button className="create-embed-btn" onClick={handleToggleEditor}>
            {showEditor ? '❌ Düzenleyiciyi Kapat' : '+ Yeni Embed Oluştur'}
          </button>

          {showEditor && (
            <div className="embed-editor">
              <div className="editor-form">
                <div className="form-section">
                  <h3>Yazar</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>İsim</label>
                      <input value={currentEmbed.author_name} onChange={handleAuthorNameChange} placeholder="Yazar adı" />
                    </div>
                    <div className="form-group">
                      <label>İkon URL</label>
                      <input value={currentEmbed.author_icon} onChange={handleAuthorIconChange} placeholder="https://..." />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>İçerik</h3>
                  <div className="form-group">
                    <label>Başlık</label>
                    <input value={currentEmbed.title} onChange={handleTitleChange} placeholder="Embed başlığı" />
                  </div>
                  <div className="form-group">
                    <label>Açıklama</label>
                    <textarea value={currentEmbed.description} onChange={handleDescriptionChange} rows="4" placeholder="Embed açıklaması" />
                  </div>
                  <div className="form-group">
                    <label>Renk</label>
                    <input type="color" value={currentEmbed.color} onChange={handleColorChange} />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Görseller</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Küçük Resim URL</label>
                      <input value={currentEmbed.thumbnail} onChange={handleThumbnailChange} placeholder="https://..." />
                    </div>
                    <div className="form-group">
                      <label>Büyük Resim URL</label>
                      <input value={currentEmbed.image} onChange={handleImageChange} placeholder="https://..." />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-header">
                    <h3>Alanlar</h3>
                    <button className="add-field-btn" onClick={addField}>+ Alan Ekle</button>
                  </div>
                  {currentEmbed.fields.map((field, idx) => (
                    <div key={idx} className="field-item">
                      <div className="field-inputs">
                        <input value={field.name} onChange={(e) => updateField(idx, 'name', e.target.value)} placeholder="Alan adı" />
                        <input value={field.value} onChange={(e) => updateField(idx, 'value', e.target.value)} placeholder="Alan değeri" />
                        <label className="checkbox-label">
                          <input type="checkbox" checked={field.inline} onChange={(e) => updateField(idx, 'inline', e.target.checked)} />
                          <span>Inline</span>
                        </label>
                        <button className="remove-field-btn" onClick={() => removeField(idx)}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="form-section">
                  <h3>Footer</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Metin</label>
                      <input value={currentEmbed.footer_text} onChange={handleFooterTextChange} placeholder="Footer metni" />
                    </div>
                    <div className="form-group">
                      <label>İkon URL</label>
                      <input value={currentEmbed.footer_icon} onChange={handleFooterIconChange} placeholder="https://..." />
                    </div>
                  </div>
                </div>

                <button className="save-embed-btn" onClick={saveEmbed}>💾 Kaydet</button>
              </div>

              <div className="embed-preview">
                <h3>Önizleme</h3>
                <div className="pawscord-embed" style={{ borderLeftColor: currentEmbed.color }}>
                  {currentEmbed.author_name && (
                    <div className="embed-author">
                      {currentEmbed.author_icon && <img src={currentEmbed.author_icon} alt="" />}
                      <span>{currentEmbed.author_name}</span>
                    </div>
                  )}
                  {currentEmbed.title && <div className="embed-title">{currentEmbed.title}</div>}
                  {currentEmbed.description && <div className="embed-description">{currentEmbed.description}</div>}
                  {currentEmbed.fields.length > 0 && (
                    <div className="embed-fields">
                      {currentEmbed.fields.map((field, idx) => (
                        <div key={idx} className={`embed-field ${field.inline ? 'inline' : ''}`}>
                          <div className="field-name">{field.name}</div>
                          <div className="field-value">{field.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {currentEmbed.image && <img className="embed-image" src={currentEmbed.image} alt="" />}
                  {currentEmbed.footer_text && (
                    <div className="embed-footer">
                      {currentEmbed.footer_icon && <img src={currentEmbed.footer_icon} alt="" />}
                      <span>{currentEmbed.footer_text}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Yükleniyor...</p>
            </div>
          ) : embeds.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📝</span>
              <p>Henüz kayıtlı embed yok</p>
            </div>
          ) : (
            <div className="embeds-list">
              {embeds.map((embed) => (
                <div key={embed.id} className="embed-card">
                  <div className="embed-info">
                    <h4>{embed.title || 'Başlıksız Embed'}</h4>
                    <p>{embed.description?.substring(0, 100)}{embed.description?.length > 100 ? '...' : ''}</p>
                  </div>
                  <div className="embed-actions">
                    <select value={selectedChannel} onChange={handleChannelChange}>
                      <option value="">Kanal seç</option>
                      {channels.map(ch => <option key={ch.id} value={ch.id}>{ch.name}</option>)}
                    </select>
                    <button onClick={() => sendEmbed(embed.id)}>📤 Gönder</button>
                    <button onClick={() => deleteEmbed(embed.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(CustomEmbedPanel);


import useProfileCardEditor from './useProfileCardEditor';
import { ProfileCard } from '../ProfileCard';
import '../ProfileCard.css';

export const ProfileCardEditor = ({ onClose, onSave }) => {
  const e = useProfileCardEditor(onClose, onSave);

  if (e.loading) {
    return <div className="profile-editor-modal"><div className="editor-loading"><div className="loading-spinner" /></div></div>;
  }

  return (
    <div className="profile-editor-overlay" onClick={(ev) => ev.target === ev.currentTarget && onClose()}>
      <div className="profile-editor-modal">
        {/* Header */}
        <div className="editor-header">
          <h2>{'\uD83C\uDFA8'} Profil Kart\u0131 D\u00fczenle</h2>
          <button className="close-btn" onClick={onClose}>\u00d7</button>
        </div>

        {/* Tabs */}
        <div className="editor-tabs">
          <button className={e.activeTab === 'appearance' ? 'active' : ''} onClick={() => e.setActiveTab('appearance')}>{'\uD83C\uDFA8'} G\u00f6r\u00fcn\u00fcm</button>
          <button className={e.activeTab === 'badges' ? 'active' : ''} onClick={() => e.setActiveTab('badges')}>{'\uD83C\uDFC5'} Rozetler</button>
          <button className={e.activeTab === 'links' ? 'active' : ''} onClick={() => e.setActiveTab('links')}>{'\uD83D\uDD17'} Ba\u011flant\u0131lar</button>
        </div>

        {/* Content */}
        <div className="editor-content">
          {e.activeTab === 'appearance' && (
            <div className="appearance-tab">
              <div className="form-group">
                <label>Banner URL</label>
                <input type="url" placeholder="https://..." value={e.formData.banner} onChange={(ev) => e.setFormData(prev => ({ ...prev, banner: ev.target.value }))} />
              </div>
              <div className="form-group">
                <label>Banner Rengi (resim yoksa)</label>
                <div className="color-picker">
                  <input type="color" value={e.formData.banner_color} onChange={(ev) => e.setFormData(prev => ({ ...prev, banner_color: ev.target.value }))} />
                  <span>{e.formData.banner_color}</span>
                </div>
              </div>
              <div className="form-group">
                <label>Tema</label>
                <div className="theme-grid">
                  {e.themes.map((theme) => (
                    <div key={theme.id} className={`theme-option ${e.formData.theme === theme.id ? 'selected' : ''}`} onClick={() => e.setFormData(prev => ({ ...prev, theme: theme.id }))} style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}>
                      <span className="theme-name">{theme.id}</span>
                      <div className="theme-colors"><span style={{ backgroundColor: theme.accent }} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Biyografi</label>
                <textarea placeholder="Kendiniz hakk\u0131nda bir \u015feyler yaz\u0131n..." value={e.formData.bio} onChange={(ev) => e.setFormData(prev => ({ ...prev, bio: ev.target.value.slice(0, 500) }))} rows={4} maxLength={500} />
                <span className="char-count">{e.formData.bio.length}/500</span>
              </div>
            </div>
          )}

          {e.activeTab === 'badges' && (
            <div className="badges-tab">
              <p className="badges-hint">Profilinizde g\u00f6r\u00fcnt\u00fclenecek en fazla 3 rozet se\u00e7in</p>
              <div className="badges-grid">
                {e.badges.map((badge) => (
                  <div key={badge.id} className={`badge-option ${!badge.owned ? 'locked' : ''} ${e.selectedBadges.includes(badge.id) ? 'selected' : ''}`} onClick={() => badge.owned && e.toggleBadge(badge.id)}>
                    <span className="badge-icon" style={{ backgroundColor: badge.color }}>{badge.icon}</span>
                    <span className="badge-name">{badge.name}</span>
                    {!badge.owned && <span className="lock-icon">{'\uD83D\uDD12'}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {e.activeTab === 'links' && (
            <div className="links-tab">
              <p className="links-hint">En fazla 5 ba\u011flant\u0131 ekleyebilirsiniz</p>
              <div className="current-links">
                {e.formData.links.map((link, idx) => (
                  <div key={idx} className="link-row">
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-name">{link.name}</span>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-url">{link.url.slice(0, 40)}...</a>
                    <button className="remove-link" onClick={() => e.handleRemoveLink(idx)}>\u00d7</button>
                  </div>
                ))}
              </div>
              {e.formData.links.length < 5 && (
                <div className="add-link-form">
                  <input type="text" placeholder="\u0130sim (opsiyonel)" value={e.newLink.name} onChange={(ev) => e.setNewLink(prev => ({ ...prev, name: ev.target.value }))} />
                  <input type="url" placeholder="URL" value={e.newLink.url} onChange={(ev) => e.setNewLink(prev => ({ ...prev, url: ev.target.value }))} />
                  <button onClick={e.handleAddLink}>Ekle</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="editor-preview">
          <h4>\u00d6nizleme</h4>
          <ProfileCard username={e.profile?.username} compact />
        </div>

        {/* Footer */}
        <div className="editor-footer">
          <button className="cancel-btn" onClick={onClose}>\u0130ptal</button>
          <button className="save-btn" onClick={e.handleSave} disabled={e.saving}>{e.saving ? 'Kaydediliyor...' : 'Kaydet'}</button>
        </div>
      </div>
    </div>
  );
};

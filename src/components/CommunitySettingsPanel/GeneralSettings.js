import { FaGavel, FaBullhorn, FaGlobe, FaComments } from 'react-icons/fa';

const GeneralSettings = ({ settings, setSettings, channels }) => (
  <div className="settings-tab">
    <div className="form-group">
      <label>Sunucu A{'çı'}klamas{'ı'}</label>
      <textarea
        value={settings.description}
        onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
        placeholder="Sunucunuz hakkında kısa bir açıklama..."
        rows="3" maxLength={300}
      />
      <span className="char-count">{settings.description?.length || 0}/300</span>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label><FaGavel /> Kurallar Kanal{'ı'}</label>
        <select value={settings.rules_channel_id} onChange={(e) => setSettings(prev => ({ ...prev, rules_channel_id: e.target.value }))}>
          <option value="">Se{'ç'}in...</option>
          {channels.map(ch => <option key={ch.id} value={ch.id}>{ch.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label><FaBullhorn /> G{'ü'}ncellemeler Kanal{'ı'}</label>
        <select value={settings.public_updates_channel_id} onChange={(e) => setSettings(prev => ({ ...prev, public_updates_channel_id: e.target.value }))}>
          <option value="">Se{'ç'}in...</option>
          {channels.map(ch => <option key={ch.id} value={ch.id}>{ch.name}</option>)}
        </select>
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label><FaGlobe /> Tercih Edilen Dil</label>
        <select value={settings.preferred_locale} onChange={(e) => setSettings(prev => ({ ...prev, preferred_locale: e.target.value }))}>
          <option value="tr">{'🇹🇷'} T{'ü'}rk{'ç'}e</option>
          <option value="en">{'🇬🇧'} English</option>
          <option value="de">{'🇩🇪'} Deutsch</option>
          <option value="fr">{'🇫🇷'} Fran{'ç'}ais</option>
        </select>
      </div>
      <div className="form-group">
        <label><FaComments /> Varsay{'ı'}lan Bildirimler</label>
        <select value={settings.default_notifications} onChange={(e) => setSettings(prev => ({ ...prev, default_notifications: e.target.value }))}>
          <option value="all">T{'ü'}m Mesajlar</option>
          <option value="mentions">Sadece Etiketler</option>
        </select>
      </div>
    </div>

    <div className="feature-toggles">
      <h4>{'Ö'}zellikler</h4>
      {[
        { key: 'welcome_screen', label: 'Karşılama Ekranı' },
        { key: 'member_screening', label: 'Üye Tarama' },
        { key: 'discovery', label: 'Sunucu Keşfet' }
      ].map(f => (
        <label key={f.key} className="feature-item">
          <span>{f.label}</span>
          <input type="checkbox" checked={settings.features?.[f.key]} onChange={(e) => setSettings(prev => ({ ...prev, features: { ...prev.features, [f.key]: e.target.checked } }))} />
        </label>
      ))}
    </div>
  </div>
);

export default GeneralSettings;

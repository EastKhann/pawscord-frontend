import { FaGavel, FaBullhorn, FaGlobe, FaComments } from 'react-icons/fa';

const GeneralSettings = ({ settings, setSettings, channels }) => (
  <div className="settings-tab">
    <div className="form-group">
      <label>Sunucu A{'\u00E7\u0131'}klamas{'\u0131'}</label>
      <textarea
        value={settings.description}
        onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
        placeholder="Sunucunuz hakk\u0131nda k\u0131sa bir a\u00E7\u0131klama..."
        rows="3" maxLength={300}
      />
      <span className="char-count">{settings.description?.length || 0}/300</span>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label><FaGavel /> Kurallar Kanal{'\u0131'}</label>
        <select value={settings.rules_channel_id} onChange={(e) => setSettings(prev => ({ ...prev, rules_channel_id: e.target.value }))}>
          <option value="">Se{'\u00E7'}in...</option>
          {channels.map(ch => <option key={ch.id} value={ch.id}>#{ch.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label><FaBullhorn /> G{'\u00FC'}ncellemeler Kanal{'\u0131'}</label>
        <select value={settings.public_updates_channel_id} onChange={(e) => setSettings(prev => ({ ...prev, public_updates_channel_id: e.target.value }))}>
          <option value="">Se{'\u00E7'}in...</option>
          {channels.map(ch => <option key={ch.id} value={ch.id}>#{ch.name}</option>)}
        </select>
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label><FaGlobe /> Tercih Edilen Dil</label>
        <select value={settings.preferred_locale} onChange={(e) => setSettings(prev => ({ ...prev, preferred_locale: e.target.value }))}>
          <option value="tr">{'\uD83C\uDDF9\uD83C\uDDF7'} T{'\u00FC'}rk{'\u00E7'}e</option>
          <option value="en">{'\uD83C\uDDEC\uD83C\uDDE7'} English</option>
          <option value="de">{'\uD83C\uDDE9\uD83C\uDDEA'} Deutsch</option>
          <option value="fr">{'\uD83C\uDDEB\uD83C\uDDF7'} Fran{'\u00E7'}ais</option>
        </select>
      </div>
      <div className="form-group">
        <label><FaComments /> Varsay{'\u0131'}lan Bildirimler</label>
        <select value={settings.default_notifications} onChange={(e) => setSettings(prev => ({ ...prev, default_notifications: e.target.value }))}>
          <option value="all">T{'\u00FC'}m Mesajlar</option>
          <option value="mentions">Sadece Etiketler</option>
        </select>
      </div>
    </div>

    <div className="feature-toggles">
      <h4>{'\u00D6'}zellikler</h4>
      {[
        { key: 'welcome_screen', label: 'Kar\u015F\u0131lama Ekran\u0131' },
        { key: 'member_screening', label: '\u00DCye Tarama' },
        { key: 'discovery', label: 'Sunucu Ke\u015Ffet' }
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

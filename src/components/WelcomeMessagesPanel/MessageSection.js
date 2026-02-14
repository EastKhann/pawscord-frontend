import { VARIABLES } from './useWelcomeMessages';

const MessageSection = ({ title, icon, config, enabledKey, channelKey, messageKey, embedKey, embedColorKey, embedTitleKey, embedDescKey, dmKey, dmMessageKey, channels, updateConfig, insertVariable, onTest }) => (
    <div className="config-section">
        <div className="section-header">
            <h3>{icon} {title}</h3>
            <label className="toggle-switch">
                <input type="checkbox" checked={config[enabledKey]} onChange={e => updateConfig(enabledKey, e.target.checked)} />
                <span className="slider"></span>
                <span className="toggle-label">{config[enabledKey] ? '\u2713 Aktif' : '\u2717 Pasif'}</span>
            </label>
        </div>

        <div className="form-grid">
            <div className="form-group full-width">
                <label>{channelKey.includes('goodbye') ? 'Veda Kanal\u0131' : 'Kar\u015F\u0131lama Kanal\u0131'}</label>
                <select value={config[channelKey]} onChange={e => updateConfig(channelKey, e.target.value)} disabled={!config[enabledKey]}>
                    <option value="">Kanal se{'\u00E7'}in</option>
                    {channels.map(ch => <option key={ch.id} value={ch.id}>{ch.name}</option>)}
                </select>
            </div>

            <div className="form-group full-width">
                <label>{channelKey.includes('goodbye') ? 'Veda Mesaj\u0131' : 'Ho\u015F Geldin Mesaj\u0131'}</label>
                <textarea value={config[messageKey]} onChange={e => updateConfig(messageKey, e.target.value)} disabled={!config[enabledKey]} rows="3" />
                <div className="variables-bar">
                    {VARIABLES.map(v => (
                        <button key={v.code} className="variable-btn" onClick={() => insertVariable(messageKey, v.code)} disabled={!config[enabledKey]} title={v.desc}>{v.code}</button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label className="checkbox-label">
                    <input type="checkbox" checked={config[embedKey]} onChange={e => updateConfig(embedKey, e.target.checked)} disabled={!config[enabledKey]} />
                    <span>Embed olarak g{'\u00F6'}nder</span>
                </label>
            </div>

            {config[embedKey] && (
                <>
                    <div className="form-group">
                        <label>Embed Rengi</label>
                        <input type="color" value={config[embedColorKey]} onChange={e => updateConfig(embedColorKey, e.target.value)} disabled={!config[enabledKey]} />
                    </div>
                    {embedTitleKey && (
                        <div className="form-group full-width">
                            <label>Embed Ba{'\u015F'}l{'\u0131'}k</label>
                            <input type="text" value={config[embedTitleKey]} onChange={e => updateConfig(embedTitleKey, e.target.value)} disabled={!config[enabledKey]} />
                        </div>
                    )}
                    {embedDescKey && (
                        <div className="form-group full-width">
                            <label>Embed A{'\u00E7\u0131'}klama</label>
                            <textarea value={config[embedDescKey]} onChange={e => updateConfig(embedDescKey, e.target.value)} disabled={!config[enabledKey]} rows="3" />
                        </div>
                    )}
                </>
            )}

            {dmKey && (
                <div className="form-group full-width">
                    <label className="checkbox-label">
                        <input type="checkbox" checked={config[dmKey]} onChange={e => updateConfig(dmKey, e.target.checked)} disabled={!config[enabledKey]} />
                        <span>Kullan{'\u0131'}c{'\u0131'}ya DM g{'\u00F6'}nder</span>
                    </label>
                </div>
            )}

            {dmKey && config[dmKey] && dmMessageKey && (
                <div className="form-group full-width">
                    <label>DM Mesaj{'\u0131'}</label>
                    <textarea value={config[dmMessageKey]} onChange={e => updateConfig(dmMessageKey, e.target.value)} disabled={!config[enabledKey]} rows="3" />
                </div>
            )}
        </div>

        {onTest && <button className="test-btn" onClick={onTest} disabled={!config[enabledKey]}>{'\uD83E\uDDEA'} Test Et</button>}
    </div>
);

export default MessageSection;

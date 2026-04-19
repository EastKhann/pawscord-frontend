/* eslint-disable jsx-a11y/label-has-associated-control */
import { VARIABLES } from './useWelcomeMessages';

import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

const MessageSection = ({
    title,
    icon,
    config,
    enabledKey,
    channelKey,
    messageKey,
    embedKey,
    embedColorKey,
    embedTitleKey,
    embedDescKey,
    dmKey,
    dmMessageKey,
    channels,
    updateConfig,
    insertVariable,
    onTest,
}) => {
    const { t } = useTranslation();

    return (
        <div className="config-section">
            <div className="section-header">
                <h3>
                    {icon} {title}
                </h3>

                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={config[enabledKey]}
                        onChange={(e) => updateConfig(enabledKey, e.target.checked)}
                    />

                    <span className="slider"></span>

                    <span className="toggle-label">
                        {config[enabledKey]
                            ? t('ui.aktif', '✓ Aktif')
                            : t('ui.devre_disi', '✗ Devre Dışı')}
                    </span>
                </label>
            </div>

            <div className="form-grid">
                <div className="form-group full-width">
                    <label>
                        {channelKey.includes('goodbye')
                            ? t('ui.veda_channeli')
                            : t('ui.welcomeChannel', 'Hoşgeldin Kanalı')}
                    </label>

                    <select
                        value={config[channelKey]}
                        onChange={(e) => updateConfig(channelKey, e.target.value)}
                        disabled={!config[enabledKey]}
                    >
                        <option value="">{t('ui.selectChannel', 'Kanal seç')}</option>

                        {channels.map((ch) => (
                            <option key={ch.id} value={ch.id}>
                                {ch.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group full-width">
                    <label>
                        {channelKey.includes('goodbye')
                            ? t('ui.veda_mesaji')
                            : t('ui.welcomeMessage', 'Hoşgeldin Mesajı')}
                    </label>

                    <textarea
                        value={config[messageKey]}
                        onChange={(e) => updateConfig(messageKey, e.target.value)}
                        disabled={!config[enabledKey]}
                        rows="3"
                    />

                    <div className="variables-bar">
                        {VARIABLES.map((v) => (
                            <button
                                key={v.code}
                                className="variable-btn"
                                onClick={() => insertVariable(messageKey, v.code)}
                                disabled={!config[enabledKey]}
                                title={v.desc}
                            >
                                {v.code}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={config[embedKey]}
                            onChange={(e) => updateConfig(embedKey, e.target.checked)}
                            disabled={!config[enabledKey]}
                        />

                        <span>{t('ui.embedOlarakGonder', 'Embed olarak gönder')}</span>
                    </label>
                </div>

                {config[embedKey] && (
                    <>
                        <div className="form-group">
                            <label>{t('embed_rengi')}</label>

                            <input
                                type="color"
                                value={config[embedColorKey]}
                                onChange={(e) => updateConfig(embedColorKey, e.target.value)}
                                disabled={!config[enabledKey]}
                            />
                        </div>

                        {embedTitleKey && (
                            <div className="form-group full-width">
                                <label>Gömme Başlığı</label>

                                <input
                                    type="text"
                                    value={config[embedTitleKey]}
                                    onChange={(e) => updateConfig(embedTitleKey, e.target.value)}
                                    disabled={!config[enabledKey]}
                                    aria-label="Config"
                                />
                            </div>
                        )}

                        {embedDescKey && (
                            <div className="form-group full-width">
                                <label>Embed A{''}klama</label>

                                <textarea
                                    value={config[embedDescKey]}
                                    onChange={(e) => updateConfig(embedDescKey, e.target.value)}
                                    disabled={!config[enabledKey]}
                                    rows="3"
                                />
                            </div>
                        )}
                    </>
                )}

                {dmKey && (
                    <div className="form-group full-width">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={config[dmKey]}
                                onChange={(e) => updateConfig(dmKey, e.target.checked)}
                                disabled={!config[enabledKey]}
                            />

                            <span>{t('ui.dmGonder', 'Kullanıcıya DM Gönder')}</span>
                        </label>
                    </div>
                )}

                {dmKey && config[dmKey] && dmMessageKey && (
                    <div className="form-group full-width">
                        <label>{t('ui.dmMesaji', 'DM Mesajı')}</label>

                        <textarea
                            value={config[dmMessageKey]}
                            onChange={(e) => updateConfig(dmMessageKey, e.target.value)}
                            disabled={!config[enabledKey]}
                            rows="3"
                        />
                    </div>
                )}
            </div>

            {onTest && (
                <button className="test-btn" onClick={onTest} disabled={!config[enabledKey]}>
                    🧪 Test Et
                </button>
            )}
        </div>
    );
};

MessageSection.propTypes = {
    title: PropTypes.string,

    icon: PropTypes.node,

    config: PropTypes.object,

    enabledKey: PropTypes.bool,

    channelKey: PropTypes.string,

    messageKey: PropTypes.string,

    embedKey: PropTypes.string,

    embedColorKey: PropTypes.string,

    embedTitleKey: PropTypes.string,

    embedDescKey: PropTypes.string,

    dmKey: PropTypes.string,

    dmMessageKey: PropTypes.string,

    channels: PropTypes.array,

    updateConfig: PropTypes.func,

    insertVariable: PropTypes.object,

    onTest: PropTypes.func,
};

export default MessageSection;

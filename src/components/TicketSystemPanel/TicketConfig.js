/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const TicketConfig = ({ config, setConfig, categories, roles, channels, updateConfig }) => {
    const { t } = useTranslation();
    return (
        <div className="ticket-config-section">
            <h3>{t('ticketConfig.title','⚙️ System Settings')}</h3>

            <div className="config-grid">
                <div className="config-item">
                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={config.enabled}
                            onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                        />
                        <span className="toggle-switch"></span>
                        <span className="toggle-text">{t('ticket_sistemi_active')}</span>
                    </label>
                </div>

                <div className="config-item">
                    <label>{t('ticket_categorysi')}</label>
                    <select
                        value={config.category_id}
                        onChange={(e) => setConfig({ ...config, category_id: e.target.value })}
                    >
                        <option value="">{t('category_selectin')}</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="config-item">
                    <label>{t('destek_roleü')}</label>
                    <select
                        value={config.support_role_id}
                        onChange={(e) => setConfig({ ...config, support_role_id: e.target.value })}
                    >
                        <option value="">{t('role_selectin')}</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="config-item">
                    <label>{t('user_bana_max_ticket')}</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={config.max_tickets_per_user}
                        onChange={(e) =>
                            setConfig({ ...config, max_tickets_per_user: parseInt(e.target.value) })
                        }
                    />
                </div>

                <div className="config-item">
                    <label>{t('otomatik_kapanma_saat')}</label>
                    <input
                        type="number"
                        min="1"
                        max="168"
                        value={config.auto_close_after}
                        onChange={(e) =>
                            setConfig({ ...config, auto_close_after: parseInt(e.target.value) })
                        }
                    />
                </div>

                <div className="config-item">
                    <label>{t('transcript_channelı')}</label>
                    <select
                        value={config.transcript_channel_id}
                        onChange={(e) =>
                            setConfig({ ...config, transcript_channel_id: e.target.value })
                        }
                    >
                        <option value="">{t('channel_selectin_opsiyonel')}</option>
                        {channels.map((channel) => (
                            <option key={channel.id} value={channel.id}>
                                {channel.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="config-item full-width">
                    <label>{t('hoş_geldin_mesajı')}</label>
                    <textarea
                        value={config.welcome_message}
                        onChange={(e) => setConfig({ ...config, welcome_message: e.target.value })}
                        rows="3"
                    />
                </div>
            </div>

            <button className="save-config-btn" onClick={updateConfig}>
                {t('ticketConfig.save','💾 Save Settings')}
            </button>
        </div>
    );
};

TicketConfig.propTypes = {
    config: PropTypes.object,
    setConfig: PropTypes.func,
    categories: PropTypes.array,
    roles: PropTypes.array,
    channels: PropTypes.array,
    updateConfig: PropTypes.func,
};
export default TicketConfig;

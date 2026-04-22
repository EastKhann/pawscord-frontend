import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const BotListView = ({ bots, onSelect, onCreateView, formatNumber }) => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('botDeveloper.listView', 'Bot list')} className="bots-list">
            {bots.length > 0 ? (
                <div className="bots-grid">
                    {bots.map((bot) => (
                        <div
                            key={bot.id}
                            className="bot-card"
                            role="button"
                            tabIndex={0}
                            onClick={() => onSelect(bot)}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <div className="bot-avatar">
                                {bot.avatar_url ? (
                                    <img src={bot.avatar_url} alt={bot.name} />
                                ) : (
                                    <div className="default-avatar">🤖</div>
                                )}
                                {bot.is_verified && <div className="verified-badge">✓</div>}
                            </div>
                            <h3>{bot.name}</h3>
                            {bot.description && (
                                <p className="bot-description">{bot.description}</p>
                            )}
                            <div className="bot-stats">
                                <span>
                                    🏰 {formatNumber(bot.servers_count)} {t('bot.servers')}
                                </span>
                                <span>
                                    👥 {formatNumber(bot.users_count)} {t('bot.users')}
                                </span>
                            </div>
                            <div className="bot-status">
                                <span
                                    className={`status-badge ${bot.is_public ? 'public' : 'private'}`}
                                >
                                    {bot.is_public ? `🌍 ${t('bot.public')}` : t('ui.ozel')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-bots">
                    <div className="no-bots-icon">🤖</div>
                    <h3>{t('bot.noBots')}</h3>
                    <p>{t('bot.noBotsDesc')}</p>
                    <button onClick={onCreateView}>🚀 {t('bot.createFirst')}</button>
                </div>
            )}
        </div>
    );
};

BotListView.propTypes = {
    bots: PropTypes.array,
    onSelect: PropTypes.func,
    onCreateView: PropTypes.func,
    formatNumber: PropTypes.func,
};
export default BotListView;

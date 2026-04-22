import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const BotCard = ({ bot, onClick }) => {
    const { t } = useTranslation();
    return (
        <div
            aria-label={t('botMarketplace.card', 'Bot card')}
            className="bot-card"
            role="button"
            tabIndex={0}
            onClick={() => onClick(bot)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div className="bot-avatar">
                <img src={bot.avatar || '/default-bot.png'} alt={bot.name} />
                {bot.is_verified && <span className="verified-badge">✓</span>}
            </div>
            <div className="bot-info">
                <h3 className="bot-name">
                    {bot.name}
                    {bot.is_featured && <span className="featured-tag">⭐ {t('botCard.featured', 'Featured')}</span>}
                </h3>
                <p className="bot-description">{bot.short_description}</p>
                <div className="bot-meta">
                    <span className="bot-installs">
                        <i>📥</i> {bot.install_count?.toLocaleString() || 0}
                    </span>
                    <span className="bot-rating">
                        <i>⭐</i> {bot.avg_rating || 0}
                    </span>
                    {bot.category && <span className="bot-category">{bot.category}</span>}
                </div>
                {bot.tags && bot.tags.length > 0 && (
                    <div className="bot-tags">
                        {bot.tags.slice(0, 3).map((tag, idx) => (
                            <span key={`item-${idx}`} className="tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

BotCard.propTypes = {
    bot: PropTypes.object,
    onClick: PropTypes.func,
};
export default BotCard;
